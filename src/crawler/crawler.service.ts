import { Injectable, Logger } from '@nestjs/common';
import { ENV_VARIABLE, ICrawlData, IScript, IStylesheet, SourceType } from '../types/index';
import { launch, Page } from 'puppeteer';
import { isLink } from './utils';
import { v4 as uuid4 } from 'uuid';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CrawlerService {
  private logger = new Logger(CrawlerService.name);
  private screenshotDirectory: string;
  constructor(private readonly configService: ConfigService) {
    this.screenshotDirectory = join(__dirname, '../../', this.configService.get<string>(ENV_VARIABLE.SCREENSHOT_DIR, './screenshots'));

    if (!fs.existsSync(this.screenshotDirectory)) {
      this.logger.verbose(`Creating new directory ${this.screenshotDirectory} for screenshots`);
      fs.mkdirSync(this.screenshotDirectory);
    } else {
      this.logger.verbose(`Directory ${this.screenshotDirectory} for screenshots exists`);
    }
  }

  /**
   *
   * @param url
   *
   */
  async crawl(url: string): Promise<ICrawlData> {
    this.logger.verbose(`Start crawling ${url}`);
    const page = await this._loadPage(url);
    const [links, screenshot, stylesheets, scripts] = await Promise.all([
      this._getLinks(page, url),
      this._getScreenshot(page, url),
      this._getStylesheets(page, url),
      this._getScripts(page, url),
    ]);

    await page.close();
    const data = {
      url,
      links,
      screenshot,
      scripts,
      stylesheets,
    };

    return data;
  }

  /**
   *
   * @param url
   */
  private async _loadPage(url: string): Promise<Page> {
    const browser = await launch({ headless: 'new', args: ['--enable-gpu'] });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    // Waits until page is loaded - assumes that two finished network connections are enough to consider a page loaded
    await page.goto(url, { waitUntil: 'networkidle2' });
    return page;
  }

  /**
   *
   */
  private async _getLinks(page: Page, url: string): Promise<string[]> {
    try {
      const links = await page.$$eval('a', (anchors) => {
        return anchors.map((anchor) => anchor.href);
      });
      return Array.from(new Set(links.filter((link) => isLink(link)))).sort((a, b) => a.localeCompare(b));
    } catch (err) {
      this.logger.error(`Could not get links for page ${url}, error: ${err.message}`);
      return [];
    }
  }

  /**
   *
   */
  private async _getScreenshot(page: Page, url: string): Promise<string> {
    const screenshotPath = join(this.screenshotDirectory, `${uuid4()}.jpeg`);
    try {
      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'jpeg',
        quality: 100,
      });
      fs.writeFileSync(screenshotPath, screenshot, {});
    } catch (err) {
      this.logger.error(`Could not take screenshot of url ${url}, error: ${err.message}`);
      return '';
    }

    return screenshotPath;
  }

  private async _getScripts(page: Page, url: string): Promise<IScript[]> {
    try {
      // Extract all external script URLs
      const external = await page.$$eval('script[src]', (scripts) => {
        return scripts.map((script) => script.src);
      });

      // Extract all inline script content
      const inline = await page.$$eval('script:not([src])', (scripts) => {
        return scripts.map((script) => script.textContent);
      });
      const externalScripts: IScript[] = external.map((script: string) => ({
        type: SourceType.LINK,
        script: script,
      }));

      const inlineScripts: IScript[] = inline.map((script: string) => ({
        type: SourceType.INLINE,
        script: script,
      }));

      return [...inlineScripts, ...externalScripts];
    } catch (err) {
      this.logger.error(`Could not take scripts for url ${url}, error: ${err.message}`);
      return [];
    }
  }

  private async _getStylesheets(page: Page, url: string): Promise<IStylesheet[]> {
    try {
      // Extract all linked stylesheets
      const linked = await page.$$eval('link[rel="stylesheet"]', (links) => {
        return links.map((link) => link.href);
      });

      // Extract all inline style content
      const inline = await page.$$eval('style', (styleTags) => {
        return styleTags.map((styleTag) => styleTag.textContent);
      });

      const inlineStyle: IStylesheet[] = inline.map((style) => ({
        type: SourceType.INLINE,
        stylesheet: style,
      }));

      const linkedStylesheets: IStylesheet[] = linked.map((style) => ({
        type: SourceType.LINK,
        stylesheet: style,
      }));
      return [...inlineStyle, ...linkedStylesheets];
    } catch (err) {
      this.logger.error(`Could not take stylesheets for url ${url}, error: ${err.message}`);
      return [];
    }
  }
}

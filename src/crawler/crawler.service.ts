import { Injectable } from '@nestjs/common';
import { ICrawlData } from '../types/index';
@Injectable()
export class CrawlerService {
  constructor() {}

  /**
   *
   * @param url
   *
   */
  async crawl(url: string): Promise<ICrawlData> {
    return {
      url,
      links: [],
      screenshot: '',
      scripts: [],
      stylesheets: [],
    };
  }

  /**
   *
   */
  private _getLinks(): string[] {
    return [];
  }

  /**
   *
   */
  private getScreenshot(): string {
    return '';
  }
}

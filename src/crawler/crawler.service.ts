import { Injectable } from '@nestjs/common';
import { ICrawlData } from '../types/index';
@Injectable()
export class CrawlerService {
  constructor() {}

  async crawl(url: string): Promise<ICrawlData> {
    return {
      url,
      links: [],
    };
  }
}

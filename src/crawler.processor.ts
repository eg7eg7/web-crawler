import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { CRAWLER_QUEUE, ICrawlTaskRequest } from './types';
import { Logger } from '@nestjs/common';
import { DalCrawlerTaskService } from './dal/services';
import { CrawlerService } from './crawler';

@Processor(CRAWLER_QUEUE)
export class CrawlTaskConsumer {
  private logger = new Logger(CrawlTaskConsumer.name);
  constructor(
    private readonly dalCrawlTaskService: DalCrawlerTaskService,
    private readonly crawlerService: CrawlerService,
  ) {}

  @Process()
  async crawl(job: Job<ICrawlTaskRequest>) {
    const start = Date.now();
    this.logger.log(`Processing job ${job.id} with url ${job.data.url}...`);
    const data = await this.crawlerService.crawl(job.data.url);
    await this.dalCrawlTaskService.update(job.data._id, data, true);
    this.logger.log(`Completed job ${job.id}, total time ${Date.now() - start} milliseconds`);
    return data;
  }
}

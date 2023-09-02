import { Processor, Process, OnQueueActive, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { CRAWLER_QUEUE, ICrawlData, ICrawlTaskRequest } from './types';
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
  @OnQueueActive()
  async onActive(job: Job<ICrawlTaskRequest>) {
    this.logger.log(`[${CRAWLER_QUEUE}-consumer] Processing job ${job.id} with url ${job.data.url}...`);
  }

  @Process()
  async crawl(job: Job<ICrawlTaskRequest>) {
    const data = await this.crawlerService.crawl(job.data.url);
    await this.dalCrawlTaskService.update(job.data._id, data, true);
    return data;
  }

  @OnQueueCompleted()
  onCompleted(job: Job<ICrawlTaskRequest>, result: ICrawlData) {
    this.logger.log(`[${CRAWLER_QUEUE}-consumer] Completed job ${job.id} with results: ${JSON.stringify(result)}`);
  }
}

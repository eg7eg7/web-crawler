import { Processor, Process } from '@nestjs/bull';
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

  @Process({
    concurrency: 3,
  })
  async crawl(job: Job<ICrawlTaskRequest>) {
    const start = Date.now();

    this.logger.log(`Processing job ${job.id} with url ${job.data.url}...`);

    try {
      const data = await this.crawlerService.crawl(job.data.url);
      this.logger.log(`Done crawling job ${job.id}, saving task data...`);
      await this.dalCrawlTaskService.setProcessed(job.data._id, data);
    } catch (err) {
      this.logger.error(`Task ${job.id} failed, ${err.message}`);
      throw err;
    }

    this.logger.log(`Completed job ${job.id}, total time ${Date.now() - start} milliseconds`);

    return true;
  }
}

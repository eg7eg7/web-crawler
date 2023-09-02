import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlerTaskSchema, CrawlerTask } from './schemas/crawler-task.schema';
import { DalCrawlerTaskService } from './services';

@Module({
  imports: [MongooseModule.forFeature([{ name: CrawlerTask.name, schema: CrawlerTaskSchema }])],
  providers: [DalCrawlerTaskService],
  exports: [DalCrawlerTaskService],
})
export class DalModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrawlerTask } from '../schemas/crawler-task.schema';
import { ICrawlData, TaskId } from 'src/types';

@Injectable()
export class DalCrawlerTaskService {
  constructor(@InjectModel(CrawlerTask.name) private readonly crawlTaskModel: Model<CrawlerTask>) {}

  /**
   *
   * @param url
   * @returns
   */
  async create(url: string): Promise<TaskId> {
    const task = await this.crawlTaskModel.create({ url, _id: new Types.ObjectId() });
    return task._id.toString();
  }

  /**
   *
   * @returns
   */
  async getAll(): Promise<Array<CrawlerTask>> {
    return await this.crawlTaskModel.find({}, undefined, { lean: true });
  }

  /**
   *
   * @param id
   * @returns
   */
  async getById(id: string) {
    return this.crawlTaskModel.findById(id, undefined, { lean: true });
  }

  async setProcessed(id: string, data: ICrawlData) {
    return this.crawlTaskModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        ...data,
        isProcessed: true,
      },
    );
  }
}

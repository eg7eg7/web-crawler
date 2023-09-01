import { Injectable, Logger } from '@nestjs/common';
import { CrawlTaskRequestDto } from './dto/crawl-task-request.dto';
import { CrawlTaskData, TaskId } from './types';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  async addTask(task: CrawlTaskRequestDto): Promise<TaskId> {
    this.logger.verbose(`[${this.addTask.name}] Adding crawl task request ${task.url}`);
    return task.url;
  }

  async getAllTasks(): Promise<Array<CrawlTaskData>> {
    const tasks = [];
    this.logger.verbose(`[${this.getAllTasks.name}] returning ${tasks.length} tasks`);
    return tasks;
  }

  async getTask(id: string): Promise<CrawlTaskData> {
    this.logger.verbose(`[${this.getTask.name}] ${id}`);
    return { id, url: 'TODO', links: [] };
  }
}

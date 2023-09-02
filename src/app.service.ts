import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CrawlTaskRequestDto } from './dto/crawl-task-request.dto';
import { ICrawlTask, TaskId } from './types';
import { DalCrawlerTaskService } from './dal/services';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly dalCrawlTaskService: DalCrawlerTaskService) {}

  async addTask(task: CrawlTaskRequestDto): Promise<TaskId> {
    this.logger.verbose(`[${this.addTask.name}] Adding crawl task request ${task.url}`);
    const taskId = await this.dalCrawlTaskService.create(task.url);
    return taskId;
  }

  async getAllTasks(): Promise<Array<ICrawlTask>> {
    const tasks = await this.dalCrawlTaskService.getAll();
    this.logger.verbose(`[${this.getAllTasks.name}] returning ${tasks.length} tasks`);
    return tasks;
  }

  async getTask(id: string): Promise<ICrawlTask> {
    this.logger.verbose(`[${this.getTask.name}] ${id}`);
    const task = await this.dalCrawlTaskService.getById(id);
    if (!task) throw new NotFoundException(`task id ${id} could not be found`);
    return task;
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CrawlTaskRequestDto } from './dto/crawl-task-request.dto';
import { CRAWLER_QUEUE, ICrawlTask, ICrawlTaskRequest, TaskId } from './types';
import { DalCrawlerTaskService } from './dal/services';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    @InjectQueue(CRAWLER_QUEUE) private crawlerQueue: Queue<ICrawlTaskRequest>,
    private readonly dalCrawlTaskService: DalCrawlerTaskService,
  ) {}

  /**
   *
   * @param task
   * @returns
   */
  async addTask(task: CrawlTaskRequestDto): Promise<TaskId> {
    this.logger.verbose(`[${this.addTask.name}] Adding crawl task request ${task.url}`);
    const taskId = await this.dalCrawlTaskService.create(task.url);
    await this.enqueue({ _id: taskId, url: task.url });
    return taskId;
  }

  /**
   *
   *
   */
  async getAllTasks(): Promise<Array<ICrawlTask>> {
    const tasks = await this.dalCrawlTaskService.getAll();
    this.logger.verbose(`[${this.getAllTasks.name}] returning ${tasks.length} tasks`);
    return tasks;
  }

  /**
   *
   * @param id
   * @throws Not found exception
   */
  async getTask(id: string): Promise<ICrawlTask> {
    this.logger.verbose(`[${this.getTask.name}] ${id}`);
    const task = await this.dalCrawlTaskService.getById(id);
    if (!task) throw new NotFoundException(`task id ${id} could not be found`);
    return task;
  }

  /**
   * @description Adds task to bull queue, to be processed later
   */
  private async enqueue(data: ICrawlTaskRequest) {
    await this.crawlerQueue.add(data);
    this.logger.log(`[${this.enqueue.name}] Added task ${data._id} with url ${data.url} to queue`);
  }
}

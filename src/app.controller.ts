import { Body, Controller, Get, Param, Post, Logger, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CrawlTaskRequestDto } from './dto/crawl-task-request.dto';
import { CrawlTaskResponseDto } from './dto/crawl-task-response.dto';
import { CrawlTaskData } from './types';
import { CrawlTaskDataResponseDto } from './dto/crawl-task-data-response.dto';

@ApiTags('crawler')
@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @ApiBody({ type: CrawlTaskRequestDto, required: true })
  @Post('crawl')
  async crawl(@Body() job: CrawlTaskRequestDto): Promise<CrawlTaskResponseDto> {
    try {
      const taskId = await this.appService.addTask(job);
      return {
        ack: true,
        taskId,
      };
    } catch (err) {
      this.logger.error(`Could not add new task ${job.url}, error: ${err.message}`);
      throw new InternalServerErrorException(`Could not add new task ${job.url}`, {
        description: err.message,
      });
    }
  }

  @ApiResponse({
    type: [CrawlTaskDataResponseDto],
  })
  @Get('tasks')
  async tasks(): Promise<Array<CrawlTaskData>> {
    const tasks = await this.appService.getAllTasks();
    return tasks;
  }

  @ApiResponse({
    type: CrawlTaskDataResponseDto,
  })
  @Get('tasks/:id')
  async getTask(@Param('id') id: string): Promise<CrawlTaskData> {
    const task = await this.appService.getTask(id);
    return task;
  }
}

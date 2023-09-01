import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('crawl')
  crawl(): string {
    return '';
  }

  @Get('tasks')
  tasks(): string {
    return '';
  }

  @Get('tasks/:id')
  getTask(@Param('id') id: string): string {
    return id;
  }
}

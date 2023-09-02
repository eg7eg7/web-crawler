import { ApiProperty } from '@nestjs/swagger';
import { TaskId } from 'src/types';

export class CrawlTaskResponseDto {
  @ApiProperty({ example: true, description: 'if true, task was added to queue' })
  ack: boolean;

  @ApiProperty({ example: '64f2f1f4d1714a3ca413ca65', description: 'task id of the requested crawl, query later to view status' })
  taskId: TaskId;
}

import { TaskId } from 'src/types';

export class CrawlTaskResponseDto {
  ack: boolean;
  taskId: TaskId;
}

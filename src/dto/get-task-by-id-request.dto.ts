import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetTaskByIdDto {
  @ApiProperty({ description: 'id of the task' })
  @IsMongoId()
  id: string;
}

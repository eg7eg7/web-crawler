import { ApiProperty } from '@nestjs/swagger';
import { CrawlTaskData } from 'src/types';

export class CrawlTaskDataResponseDto implements CrawlTaskData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty({ type: [String] })
  links: string[];
}

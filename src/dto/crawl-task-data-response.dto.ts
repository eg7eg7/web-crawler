import { ApiProperty } from '@nestjs/swagger';
import { ICrawlTask } from 'src/types';

export class CrawlTaskDataResponseDto implements ICrawlTask {
  @ApiProperty({ example: '64f2f1f4d1714a3ca413ca65' })
  _id: string;

  @ApiProperty({ example: 'https://www.google.com' })
  url: string;

  @ApiProperty({ type: [String], example: ['https://www.akamai.com'] })
  links: string[];
}

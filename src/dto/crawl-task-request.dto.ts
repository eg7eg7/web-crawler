import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CrawlTaskRequestDto {
  @ApiProperty({
    description: 'URL to be crawled',
    example: 'https://www.akamai.com/',
    required: true,
  })
  @IsUrl()
  url: string;
}

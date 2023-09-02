import { ApiProperty } from '@nestjs/swagger';
import { ICrawlTask, IScript, IStylesheet, SourceType } from 'src/types';

export class ScriptDto implements IScript {
  @ApiProperty({ enum: SourceType })
  type: SourceType;

  @ApiProperty({ type: String, description: 'Link to script if type is "link", actual script if type "inline"' })
  script: string;
}

export class StylesheetDto implements IStylesheet {
  @ApiProperty({ enum: SourceType })
  type: SourceType;

  @ApiProperty({ type: String, description: 'Link to stylesheet if type is "link", actual stylesheet if type "inline"' })
  stylesheet: string;
}

export class CrawlTaskDataResponseDto implements ICrawlTask {
  @ApiProperty({ example: '64f2f1f4d1714a3ca413ca65' })
  _id: string;

  @ApiProperty({ example: 'https://www.google.com' })
  url: string;

  @ApiProperty({ type: [String], example: ['https://www.akamai.com'] })
  links: string[];

  @ApiProperty({ type: String })
  screenshot: string;

  @ApiProperty({ type: [ScriptDto] })
  scripts: IScript[];

  @ApiProperty({ type: [StylesheetDto] })
  stylesheets: IStylesheet[];
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ICrawlTask, IScript, IStylesheet, SourceType } from 'src/types';

export type CrawlerTaskDocument = HydratedDocument<CrawlerTask>;

@Schema({ _id: false })
class Stylesheet implements IStylesheet {
  @Prop({ type: String, required: true, enum: SourceType })
  type: SourceType;

  @Prop({ type: String, required: true })
  stylesheet: string;
}
const StylesheetSchema = SchemaFactory.createForClass(Stylesheet);
@Schema({ _id: false })
class Script implements IScript {
  @Prop({ type: String, required: true, enum: SourceType })
  type: SourceType;

  @Prop({ type: String, required: true })
  script: string;
}
const ScriptSchema = SchemaFactory.createForClass(Script);

@Schema({
  collection: 'crawler-task',
  timestamps: true,
  _id: true,
  versionKey: false,
})
export class CrawlerTask implements ICrawlTask {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: [String] })
  links: string[];

  @Prop({ type: [ScriptSchema] })
  scripts: IScript[];

  @Prop({ type: [StylesheetSchema] })
  stylesheets: IStylesheet[];

  @Prop({ type: String })
  screenshot: string;

  @Prop({ type: Boolean, required: true, default: false })
  isProcessed: boolean;
}

export const CrawlerTaskSchema = SchemaFactory.createForClass(CrawlerTask);

import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ICrawlTask } from 'src/types';

export type CrawlerTaskDocument = HydratedDocument<CrawlerTask>;

@NestSchema({
  timestamps: true,
  _id: true,
})
export class CrawlerTask implements ICrawlTask {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: [String], required: true, default: [] })
  links: string[];
}

export const CrawlerTaskSchema = SchemaFactory.createForClass(CrawlerTask);

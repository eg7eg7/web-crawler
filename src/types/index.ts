export type TaskId = string;

export interface ICrawlTaskRequest {
  _id: TaskId;
  url: string;
}

export interface ICrawlData {
  url: string;
  links: string[];
}

export type ICrawlTask = ICrawlTaskRequest & ICrawlData;

export const CRAWLER_QUEUE = 'crawler-queue';

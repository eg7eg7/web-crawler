export type TaskId = string;

export interface CrawlTaskRequest {
  id: TaskId;
  url: string;
}

export interface CrawlTaskData extends CrawlTaskRequest {
  links: string[];
}

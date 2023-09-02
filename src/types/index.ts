export type TaskId = string;

export interface ICrawlTaskRequest {
  /** Task ID */
  _id: TaskId;

  /** URL to be scanned */
  url: string;
}

export interface ICrawlData {
  /** Scanned URL */
  url: string;

  /** Links which were found in the website (Outgoing URLS) */
  links: string[];

  /** Screenshot saved in disk, path of the screenshot */
  screenshot: string;

  /** Scripts found in the website */
  scripts: string[];

  /** Stylesheets found in the website */
  stylesheets: string[];
}

export type ICrawlTask = ICrawlTaskRequest & ICrawlData;

export const CRAWLER_QUEUE = 'crawler-queue';

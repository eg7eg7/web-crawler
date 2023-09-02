export type TaskId = string;

export interface ICrawlTaskRequest {
  /** Task ID */
  _id: TaskId;

  /** URL to be scanned */
  url: string;
}

export enum SourceType {
  INLINE = 'inline',
  LINK = 'link',
}

export interface IStylesheet {
  type: SourceType;

  /** Contains stylesheet content if type 'inline', or link if type 'link' */
  stylesheet: string;
}

export interface IScript {
  type: SourceType;

  /** Contains script content if type 'inline', or link if type 'link' */
  script: string;
}

export interface ICrawlData {
  /** Scanned URL */
  url: string;

  /** Links which were found in the website (Outgoing URLS) */
  links: string[];

  /** Screenshot saved in disk, path of the screenshot */
  screenshot: string;

  /** Scripts found in the website */
  scripts: IScript[];

  /** Stylesheets found in the website */
  stylesheets: IStylesheet[];
}

export type ICrawlTask = ICrawlTaskRequest & ICrawlData;

export const CRAWLER_QUEUE = 'crawler-queue';

/**
 * App variables
 */
export const ENV_VARIABLE = {
  /** Used for bull queue connection */
  REDIS_QUEUE_HOST: 'REDIS_QUEUE_HOST',
  REDIS_QUEUE_PORT: 'REDIS_QUEUE_PORT',

  MONGO_URI: 'MONGO_URI',
  PORT: 'PORT',

  /** Crawler screenshots will be saved here */
  SCREENSHOT_DIR: 'SCREENSHOT_DIR',
};

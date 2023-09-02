# Web Crawler

## Run project

`docker-compose up`

Screenshots can be viewed in the [./screenshots](./screenshots) folder, will be created automatically upon running above script

## API Documentation

To view API Docs using Swagger: http://localhost:3000/api

## Design

Databases:

- Mongo: Save Task and crawling data
- Redis: Used for bull queues

1. When a POST request is done with url, a new task is created and added to bull queue
2. bull consumer crawls the website using puppeteer retrieving links (valid urls), screenshot of the page, stylesheets (both external and inlines), scripts (both external and inlines)
3. Save data to Mongo
4. Finish bull job

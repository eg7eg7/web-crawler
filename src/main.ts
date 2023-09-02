import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE } from './types';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Web Crawler')
    .setDescription('The Web Crawler API description')
    .setVersion('1.0')
    .addTag('web-crawler')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Web Crawler API',
  });
}

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port: number = configService.get<number>(ENV_VARIABLE.PORT, 3000);
  await app.listen(port);

  logger.log(`App started in port ${port}`);
  logger.verbose(`View API Documentation with swagger: http://localhost:${port}/api`);
}

bootstrap();

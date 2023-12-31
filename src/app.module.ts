import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DalModule } from './dal/dal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlerModule } from './crawler';
import { BullModule } from '@nestjs/bull';
import { CRAWLER_QUEUE, ENV_VARIABLE } from './types';
import { CrawlTaskConsumer } from './crawler.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DalModule,
    CrawlerModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(ENV_VARIABLE.MONGO_URI),
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get(ENV_VARIABLE.REDIS_QUEUE_HOST),
          port: configService.get(ENV_VARIABLE.REDIS_QUEUE_PORT),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: CRAWLER_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CrawlTaskConsumer],
})
export class AppModule {}

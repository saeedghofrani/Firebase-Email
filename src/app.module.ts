import { CacheModule, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SwaggerConfigModule } from './config/swagger/swagger.module';
import { SwaggerConfigService } from './config/swagger/swagger.service';
import { AppConfigModule } from './config/app/app.config.module';
import { AppConfigService } from './config/app/app.config.service';

import { LangModule } from './utility/language/lang.module';
import { RedisService } from './utility/redis/redis.service';
import { RedisModule } from './utility/redis/redis.module';
import { LoggerModule } from './utility/logger/logger.module';
import { GlobalModule } from './utility/global/global.module';

import { EmailModule } from './email/email.module';
import { FirebaseModule } from './utility/firebase/firebase.module';


@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    RedisModule.forRoot('127.0.0.1' , 6379 ),
    SwaggerConfigModule,
    LangModule,
    GlobalModule,
    LoggerModule,
    EmailModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SwaggerConfigService,
    AppConfigService,
    RedisService
  ],
})
export class AppModule {}

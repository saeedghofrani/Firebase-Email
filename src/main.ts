import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  Logger as NestLogger,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { logger } from './helpers/logger.class';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerConfigService } from './config/swagger/swagger.service';

import { join } from 'path';
import { AppConfigService } from './config/app/app.config.service';
import { RedisService } from './utility/redis/redis.service';
import { LangService } from './utility/language/lang.service';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';
import { ValidationFilter } from './common/filter/validation.filter';
import { ValidationException } from './common/filter/validation.exception';

import { EmailService } from './email/service/email.service';
import * as admin from 'firebase-admin';
import { FirebaseService } from './utility/firebase/service/firebase.service';

async function bootstrap() {
  const nestLogger = new NestLogger('Main_Logger');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(logger.config),
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useStaticAssets(
    join(__dirname, process.env.SERVER_STATIC_URL, '_ASSETS'),
  );

  const redisService = app.get<RedisService>(RedisService);
  const email = app.get<EmailService>(EmailService);
  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService);
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const langService = app.get<LangService>(LangService);
  const port = appConfigService.port || 4000;
  console.log(port)
  const mode = process.env.NODE_ENV;
  app.setGlobalPrefix(appConfigService.apiGlobalPrefix);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  if (swaggerConfig.isEnable && mode == 'debug') {
    nestLogger.log(`Swagger Is Enable In Debug`, 'Swagger');

    swaggerConfig.init(app);
  }
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_PROJECT_ID
    } as Partial<admin.ServiceAccount>),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  const firebaseService = app.get<FirebaseService>(FirebaseService);

  await app.listen(appConfigService.port).then(async () => {
    firebaseService.runTracker()
    console.log("444444444444")
    await redisService.setKeyNoExpire('SERVER_UPTIME_BOT_EMAIL', JSON.stringify(Date().toString()))
    nestLogger.log(`Running`, 'Swagger');
  });
}
bootstrap();

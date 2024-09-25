import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import appConfiguration from './app-configuration';
import i18nConfiguration from './i18n-configuration';
import securityConfiguration from './security-configuration';
import tokenConfiguration from './token-configuration';
import verificationConfiguration from './verification-configuration';
import { AppConfigService } from './app.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [
        appConfiguration,
        verificationConfiguration,
        tokenConfiguration,
        i18nConfiguration,
        securityConfiguration,
      ],
      validationSchema: Joi.object({
        // APP_ENV: Joi.string()
        //   .valid('debug', 'test', 'release')
        //   .required().default('debug'),
        APP_NAME: Joi.string().default('no name'),
        APP_PORT: Joi.number().default(3000),
        APP_API_GLOBAL_PREFIX: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}

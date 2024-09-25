import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { SwaggerConfigService } from './swagger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        IS_ENABLE: Joi.boolean().default(false),
        TITLE: Joi.string().default('no title'),
        DESCRIPTION: Joi.string().default('no description'),
        VERSION: Joi.string().default('1.0'),
        PREFIX: Joi.string().default('api'),
      }),
    }),
  ],
  providers: [ConfigService, SwaggerConfigService],
  exports: [ConfigService, SwaggerConfigService],
})
export class SwaggerConfigModule {}
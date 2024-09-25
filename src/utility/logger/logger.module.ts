import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports :[ WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ],
  }),] ,
  providers: [LoggerService] ,
  exports :[LoggerService]
})
export class LoggerModule {}

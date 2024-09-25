import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class LoggerService {
 constructor(  @Inject(WINSTON_MODULE_PROVIDER)  private readonly logger: Logger ) {
 }
  error(message: any) {
    this.logger.error(message);
  }

  http(message: any) {
    this.logger.http(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  data(message: any) {
    this.logger.data(message);
  }

  info(message: any) {
    this.logger.info(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }
  log(level: 'error' | 'http' | 'warn' | 'data' | 'info' | 'debug', message: any) {
    this.logger.log(level, message,);
  }
}

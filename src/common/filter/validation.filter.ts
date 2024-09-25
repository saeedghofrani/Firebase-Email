import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationException } from "./validation.exception";
import { LangService } from "../../utility/language/lang.service";
import { AppConfigService } from "../../config/app/app.config.service";
import { Response } from './../class/response.class';


@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  constructor(

    ) {}

  async catch(
    exception: ValidationException,
    host: ArgumentsHost,
  ): Promise<any> {
    let response = new Response<null>();
    const ctxRequest = host.switchToHttp().getRequest();
    const ctxResponse = host.switchToHttp().getResponse();
    const languageInfo = ctxRequest.languageInfo;
    console.log("------------")

    console.log(languageInfo)


    return ctxResponse.status(HttpStatus.BAD_REQUEST).json(response.Get());
  }
}

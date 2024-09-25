import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    console.log({ status , url : request.url })
    const date=Date.now()
    switch (status) {
      case 400 :{
        response
          .status(status)
          .json({
            msg : exception ,
            status_code: status,
            timestamp: date,
            path: request.url,
          });
        break;
      }
      case 401 :{
        response
          .status(status)
          .json({
            status_code: status,
            timestamp: date,
            path: request.url,
          });
        break;
      }
      case 402 :{
        response
          .status(status)
          .json({
            msg : exception ,
            statusCode: status,
            timestamp: date,
            path: request.url,
          });
        break;
      }
      case 403 :{
        response
          .status(status)
          .json({
            msg : exception["response"] ,
            statusCode: status,
            timestamp: date,
            path: request.url,
          });
        break;
      }
      case 500 :{
        response
          .status(status)
          .json({
            msg : exception ,
            statusCode: status,
            timestamp: date,
            path: request.url,
          });
        break;
      }
    }

  }
}
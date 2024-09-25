import { HttpStatus } from '@nestjs/common';

export class CheckOut {
  status = true;
  httpStatus?: HttpStatus = undefined;
  message = '';
  messageCode: string | string[] = '';
}

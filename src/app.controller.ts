import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

const randomstring = require('randomstring');

@Controller()
export class AppController {
  constructor(

  ) {}

  @Get()
  getEnv(): Object {
    return { result: process.env.NODE_ENV };
  }



}

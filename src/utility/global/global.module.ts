import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { HashService } from "./hash.service";

@Module({
  providers: [GlobalService , HashService] ,
  exports :[GlobalService , HashService]
})
export class GlobalModule {}

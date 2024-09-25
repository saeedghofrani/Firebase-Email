import { Module } from '@nestjs/common';
import { EmailService } from './service/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEmailRepository } from './repository/log.email.repository';
import { ConfigEmailLogPostgresql } from './config/config.db.chain';

@Module({
  imports :[
    TypeOrmModule.forRoot(ConfigEmailLogPostgresql),
    TypeOrmModule.forFeature([
        LogEmailRepository,
    ])
  ] ,
  providers: [EmailService] ,
  exports :[EmailService]
})
export class EmailModule {}

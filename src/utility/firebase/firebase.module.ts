import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from "./service/firebase.service";
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../../email/email.module';

@Module({
  imports :[RedisModule.forRoot('127.0.0.1' , 6739) , EmailModule] ,
  controllers: [FirebaseController] ,
  providers :[ FirebaseService] ,
  exports :[FirebaseService ]
})
export class FirebaseModule {}

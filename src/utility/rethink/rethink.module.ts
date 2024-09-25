import { DynamicModule, Module } from '@nestjs/common';
import { RethinkService } from './rethink.service';
import { RedisService } from '../redis/redis.service';
import * as rethink from 'rethinkdb';
import { RedisModule } from "../redis/redis.module";
import { EmailModule } from '../../email/email.module';
@Module({
  imports :[RedisModule.forRoot('127.0.0.1' , 6739) , EmailModule] ,
  providers: [RethinkService],
})
export class RethinkModule {
  static forRoot(
    host: string,
    port: number,
    db :  string

  ): DynamicModule {
    return {
      module: RethinkModule,
      providers: [
        {
          provide: 'RethinkProvider',
          useFactory: async () => {
            const option = {
              host: host,
              timeout: 30,
              port: port,
              db
            }
            let connection = await rethink.connect(option);

            connection.addListener('error' ,()=>{


            })
            connection.addListener('timeout' ,async()=>{
              connection.reconnect({noreplyWait : false})
            })
            connection.addListener('close' ,async () => {

            })

            return connection;
          },
        },
        RethinkService,
      ],
      exports: [RethinkService],
    };
  }
}

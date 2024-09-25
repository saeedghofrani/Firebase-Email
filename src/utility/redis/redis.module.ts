import { CacheModule as BaseCashModule, DynamicModule, Module } from "@nestjs/common";
import { RedisService } from './redis.service';
var redisStore = require('cache-manager-ioredis');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redis = require('redis');
@Module({})
export class RedisModule {
  static forRoot(
    host: string,
    port: number,
  ): DynamicModule {
    return {
      imports :[ BaseCashModule.registerAsync({
        useFactory :()=>{
            return {
              store : redisStore ,
              host : host || '127.0.0.1' ,
              port : port || 6379
            }

        }
      })] ,
      module: RedisModule,
      providers: [
        RedisService,
      ],
      exports: [RedisService , BaseCashModule],
    };
  }
}

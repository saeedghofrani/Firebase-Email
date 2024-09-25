import { CACHE_MANAGER , INestApplication, Inject, Injectable } from "@nestjs/common";
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { Cache, Store } from "cache-manager";
var redisStore = require('cache-manager-ioredis');


@Injectable()
export class RedisService {
  nestLogger: any = undefined;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.nestLogger = new NestLogger('Redis_Logger');




  }
  async setKeyNoExpire(key : string , value : string ) {
    await this.cacheManager.set(key,value, { ttl: 0 });
  }
  async setKey(key : string , value : string  , ttl? : number) {
    await this.cacheManager.set(key,value, { ttl: ttl  });
  }
  async getKey(key : string ): Promise<string | boolean> {
    const result = await this.cacheManager.get<string>(key);
    return (result==null) ? true : result
  }
  // connect(app: INestApplication, port: number) {
  //   const nestLogger = this.nestLogger;
  //   this.redis.connect();
  //   if (this.redis.connected) console.log("ok"); else console.log("cancel")
  //   this.redis.on('connect', async function () {
  //     nestLogger.log(`Connect Server Redis : ${port}`, '*** REDIS ***');
  //     this.set('SERVER_UPTIME', JSON.stringify(Date().toString()), this.print);
  //     app.listen(port).then(() => {
  //       nestLogger.log(`localhost:${port}/api/v1`);
  //       nestLogger.log(`Connect Server Port : ${port}`, '*** SERVER ***');
  //     });
  //   });
  //   // this.redis.connect();
  // }
  async connect() {

  }


}

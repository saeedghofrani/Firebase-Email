import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  apiGlobalPrefix: process.env.API_GLOBAL_PREFIX,
  redisHost: process.env.APP_REDIS_HOST,
  redisPort: process.env.APP_REDIS_PORT,
}));


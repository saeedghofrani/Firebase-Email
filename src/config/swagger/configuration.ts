import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  isEnable: process.env.SWAGGER_ENABLE,
  title: process.env.SWAGGER_TITLE,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  preFix: process.env.SWAGGER_PREFIX,
}));
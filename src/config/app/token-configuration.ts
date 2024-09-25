import { registerAs } from '@nestjs/config';

export default registerAs('token', () => ({
  accessTokenExpiration: process.env.TOKEN_ACCESS_TOKEN_EXPIRATION,
  accessTokenExpirationInMilliseconds: process.env.TOKEN_ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS,
  refreshTokenExpiration: process.env.TOKEN_REFRESH_TOKEN_EXPIRATION,
  secretKey: process.env.TOKEN_SECRET_KEY,
}));


import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  saltOrRounds: process.env.SALT_OR_ROUNDS,
  checkAuthorization: process.env.CHECK_AUTHORIZATION,
  checkIP: process.env.CHECK_IP,
  checkUserIP: process.env.CHECK_USER_IP,
  checkUserAgent: process.env.CHECK_USER_AGENT,
}));


import { registerAs } from '@nestjs/config';

export default registerAs('verification', () => ({
  resendDelay: process.env.VERIFICATION_RESEND_DELAY,
  resendQnty: process.env.VERIFICATION_RESEND_Qnty,
  codeExpiration: process.env.VERIFICATION_CODE_EXPIRATION,
}));


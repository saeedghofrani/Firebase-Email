import { registerAs } from '@nestjs/config';

export default registerAs('i18n', () => ({
  translateClassValidation: process.env.I18N_TRANSLATE_CLASS_VALIDATION,
}));


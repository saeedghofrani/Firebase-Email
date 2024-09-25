
import { Injectable } from '@nestjs/common';
import { EmailService } from '../../../email/service/email.service';
import { RegisterDto } from '../../../email/dto/registerDto';
import { MapperLanguageEnum } from '../../../common/enums/mapper.language.enum';
import { CaptionEmailEnum } from '../../../common/enums/caption.email.enum';
import { LangService } from '../../language/lang.service';
import { RedisService } from '../../redis/redis.service';
const { getDatabase  } = require('firebase-admin/database');
const randomstring = require('randomstring');
@Injectable()
export class FirebaseService {

  constructor(private emailService : EmailService ,
              private  langService :LangService ,
              private  redisService :RedisService) {

  }
  async runTracker() {
    this.onChangeEmailRegister()
    this.onChangeEmailConfirm()
    this.onChangeEmailChange()
    this.onChangeForgetPassword()
    this.onChangePrepareEnableG2()
    this.onChangeConfirmG2()
    this.onChangePrepareDisableG2()
  }
  async  onChangeEmailRegister( ) {
    const emailService = this.emailService
    const langService = this.langService
    const redisService = this.redisService
    const db = getDatabase();
    const ref = db.ref('email_register');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        var data = snapshot.val()
        const msg = await langService.translateDictionary(
          'email',
          'PREPARE_CODE_REGISTER',
          MapperLanguageEnum[data.lang],
        );
        const lang = data.lang
        const emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.PREPARE_REGISTER_EMAIL}`,
          data: data.data,
          date: data.date,
          lang: data.lang,
          subject: msg,
          ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)

      } catch (err) {
      } finally {
        const value = {
          code: data.data.code ,
          ip: data.ip ,
          hash : data.data.hash ,
          email : data.data.email
        }
        db.ref(`email_register/${snapshot.key}`).remove()
        await redisService.setKey(`register_email_${data.data.hash}`, JSON.stringify(value), 360)
      }

    });
  }
  async  onChangeEmailConfirm( ) {
    const emailService = this.emailService
    const langService = this.langService
    const db = getDatabase();
    const ref = db.ref('email_confirm');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        const data = snapshot.val()
        console.log(data)
        const msg = await langService.translateDictionary(
          'email',
          'CONFIRM_REGISTER',
          MapperLanguageEnum[data.lang],
        );
        const lang = data.lang
        const emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.CONFIRM_REGISTER}`,
          data: data.data,
          date: data.date,
          lang: data.lang,
          subject: msg,
          ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)

      } catch (err) {
        console.log(err)
      } finally {
        db.ref(`email_confirm/${snapshot.key}`).remove()
      }

    });
  }
  async  onChangeEmailChange( ) {
    const emailService = this.emailService
    const langService = this.langService
    const redisService = this.redisService
    const db = getDatabase();
    const ref = db.ref('email_change');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        var data = snapshot.val()
        const msg1= await langService.translateDictionary(
          'email',
          'PREPARE_CODE_CHANGE_EMAIL1',
          MapperLanguageEnum[data.lang],
        );
        const msg2= await langService.translateDictionary(
          'email',
          'PREPARE_CODE_CHANGE_EMAIL2',
          MapperLanguageEnum[data.lang],
        );
        const lang = data.lang
        let emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.PREPARE_CHANGE_EMAIL1}`,
          data: data.data, date: data.date,lang: data.lang,
          subject: msg1,ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)
         emailDto = {
           email: data.data.email_new,
           file: `${lang}/${CaptionEmailEnum.PREPARE_CHANGE_EMAIL2}`,
           data: data.data, date: data.date, lang: data.lang,
           subject: msg2, ip: data.ip,
         };
         info =  await emailService.sendEmail(emailDto)
      } catch (err) {
        console.log(err)
      }finally {
        const value = {
          code1: data.data.code1 , code2: data.data.code2 ,ip: data.ip ,
          email: data.data.email_new ,
          hash : data.data.hash
        }
        db.ref(`email_change/${snapshot.key}`).remove()
        await redisService.setKey(`change_email_${data.data.hash}`, JSON.stringify(value), 360)
      }

    });
  }
  async  onChangeForgetPassword( ) {
    const emailService = this.emailService
    const langService = this.langService
    const redisService = this.redisService
    const db = getDatabase();
    const ref = db.ref('forget_password');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        var data = snapshot.val()
        console.log(data)
        const msg1= await langService.translateDictionary(
          'email',
          'PREPARE_FORGET_PASSWORD',
          MapperLanguageEnum[data.lang],
        );

        const lang = data.lang
        let emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.PREPARE_FORGET_PASSWORD}`,
          data: data.data, date: data.date,lang: data.lang,
          subject: msg1,ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)

      } catch (err) {
        console.log(err)
      } finally {
        const value = {
          code: data.data.code ,
          ip: data.ip ,
          uid: data.data.uid ,
          hash : data.data.hash
        }
        db.ref(`forget_password/${snapshot.key}`).remove()
        await redisService.setKey(`forget_password_${data.data.hash}`, JSON.stringify(value), 360)
      }

    });
  }
  async  onChangePrepareEnableG2( ) {
    const emailService = this.emailService
    const langService = this.langService
    const redisService = this.redisService
    const db = getDatabase();
    const ref = db.ref('enable_g2');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        var data = snapshot.val()
        console.log(data)
        const msg1= await langService.translateDictionary(
          'email',
          'PREPARE_ENABLE_G2',
          MapperLanguageEnum[data.lang],
        );

        const lang = data.lang
        let emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.PREPARE_ENABLE_G2}`,
          data: data.data, date: data.date,lang: data.lang,
          subject: msg1,ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)
      } catch (err) {
        console.log(err)
      } finally {
        const value = {
          code: data.data.code ,
          ip: data.ip ,
          uid: data.data.uid ,
          hash : data.data.hash
        }
        db.ref(`enable_g2/${snapshot.key}`).remove()
        await redisService.setKey(`enable_g2${data.data.hash}`, JSON.stringify(value), 360)
      }

    });
  }
  async  onChangeConfirmG2( ) {
    const emailService = this.emailService
    const langService = this.langService
    const db = getDatabase();
    const ref = db.ref('confirm_enable_g2');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      try {
        const data = snapshot.val()
        console.log(data)
        const msg1= await langService.translateDictionary(
          'email',
          'CONFIRM_ENABLE_G2',
          MapperLanguageEnum[data.lang],
        );
        const lang = data.lang
        let emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.CONFIRM_ENABLE_G2}`,
          data: data.data, date: data.date,lang: data.lang,
          subject: msg1,ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)

      } catch (err) {
        console.log(err)
      } finally {
        db.ref(`confirm_enable_g2/${snapshot.key}`).remove()
      }

    });
  }
  async  onChangePrepareDisableG2( ) {
    const emailService = this.emailService
    const langService = this.langService
    const redisService = this.redisService
    const db = getDatabase();
    const ref = db.ref('disable_g2');
    ref.on('child_added', async (snapshot, prevChildKey) => {
      const data = snapshot.val()
      try {
        const data = snapshot.val()
        console.log(data)
        const msg1= await langService.translateDictionary(
          'email',
          'PREPARE_DISABLE_G2',
          MapperLanguageEnum[data.lang],
        );
        const lang = data.lang
        let emailDto: RegisterDto = {
          email: data.data.email,
          file: `${lang}/${CaptionEmailEnum.PREPARE_DISABLE_G2}`,
          data: data.data, date: data.date,lang: data.lang,
          subject: msg1,ip: data.ip
        }
        let info =  await emailService.sendEmail(emailDto)


      } catch (err) {
        console.log(err)
      } finally {
        const value = {
          code_email: data.data.code ,
          ip: data.ip ,
          uid: data.data.uid ,
          hash : data.data.hash
        }
        db.ref(`disable_g2/${snapshot.key}`).remove()
        await redisService.setKey(`disable_g2${data.data.hash}`, JSON.stringify(value), 360)
      }

    });
  }

}

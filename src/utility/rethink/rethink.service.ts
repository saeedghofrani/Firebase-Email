import { Inject, Injectable } from '@nestjs/common';
import * as rethink from 'rethinkdb';

import { RedisService } from '../redis/redis.service';
import { EmailService } from '../../email/service/email.service';
import { RegisterDto } from '../../email/dto/registerDto';
import { MapperLanguageEnum } from '../../common/enums/mapper.language.enum';
import { CaptionEmailEnum } from '../../common/enums/caption.email.enum';
import { LangService } from '../language/lang.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');
@Injectable()
export class RethinkService {

  constructor(@Inject('RethinkProvider') private rethinkConnection ,
              private emailService : EmailService ,
              private langService : LangService ,
              private redisService : RedisService) {
    this.sendEmail()


  }
  async sendEmail() {
    const emailService = this.emailService
    const langService=this.langService
    const redisService=this.redisService
    await rethink
      .db("nest")
      .table("email_register")
      .changes()
      .run(this.rethinkConnection,(err, cursor)=>{
        if (err) console.log("Error Match")
        cursor.each(async function(err, row) {
          const json = row.new_val
          const lang = json.lang
          const msg = await langService.translateDictionary(
            'email',
            'PREPARE_CODE_REGISTER',
            MapperLanguageEnum[json.lang],
          );
          const emailDto :RegisterDto = {
            email : json.email ,
            file : `${lang}/${CaptionEmailEnum.PREPARE_REGISTER_EMAIL}` ,
            data : json.data ,
            date : json.date ,
            lang : lang ,
            subject :msg ,
            ip : json.ip
          }
          console.log(emailDto.data)

          await emailService.sendEmail(emailDto)
          const value = {
            code : json.data.code
          }
          await redisService.setKey(`register_email_${json.data.hash}` , JSON.stringify(value) , 360)
          let rs= await rethink
            .db("nest")
            .table("email_register")
            .get(json.id).delete()

        })
      });
  }

}

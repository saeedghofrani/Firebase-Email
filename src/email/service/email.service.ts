import { Injectable } from '@nestjs/common';
const nodemailer=require('nodemailer')
const ejs=require('ejs')
const fs=require('fs')
const path=require('path')

import { RegisterDto } from '../dto/registerDto';
@Injectable()
export class EmailService {
  constructor() {
  }
  async sendEmail( emailDto : RegisterDto) {
    console.log("///////////////////////////////////////////////////")
    console.log(emailDto)
    let transporter = nodemailer.createTransport({
      host: "mail.novintex.info",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@novintex.info",
        pass: "R=czPMnLIHNP&&uS&w"
      }
    });

    let Str = await fs.readFileSync(path.join(__dirname,"../",'template',emailDto.file)+'.ejs')
    let html = ejs.render(Str.toString(), emailDto.data);
    let info = await transporter.sendMail({
      from: "info@novintex.info", // sender address
      to: emailDto.email, // list of receivers
      subject: emailDto.subject, // Subject line
      html : html ,
    })
    return info
  }
}

import { Injectable } from '@nestjs/common';
import { HeaderRequestInterface } from "./interface/header.request.interface";
const crypto = require("crypto");

@Injectable()
export class HashService {

  constructor() {
  }

  async encrypt(text) : Promise<EncryptTextInterface>  {
    const algorithm = "aes-256-cbc";
    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return {
      text : encryptedData ,
      iv : iv.toString('hex') ,
      key : key.toString('hex')
    }
  }

  async decrypt( encryptTextInterface : EncryptTextInterface) : Promise<string | boolean>  {
  try {
    let key =  Buffer.from(encryptTextInterface.key, "hex")
    let iv =  Buffer.from(encryptTextInterface.iv, "hex")
    const decipher = crypto.createDecipheriv("aes-256-cbc", crypto.randomBytes(32), crypto.randomBytes(16));

    let decryptedData = decipher.update(encryptTextInterface.text, "hex", "utf-8");

    decryptedData += decipher.final("utf8");
    return  decryptedData
  }catch (err) {
    return false
  }

  }


}

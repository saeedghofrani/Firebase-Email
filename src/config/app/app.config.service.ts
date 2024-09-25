import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  // app
  get env(): string {
    return this.configService.get<string>('app.env');
  }  
  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get port(): number {
   return Number(this.configService.get<number>('app.port'));
  }
  get apiGlobalPrefix(): string {
    return this.configService.get<string>('app.apiGlobalPrefix');
  }
  get version(): string {    
    const version = require('./../../../package.json').version || '';
    return version;
  }  
  get redisHost(): string {
    return this.configService.get<string>('app.redisHost');
  }  
  get redisPort(): string {
    return this.configService.get<string>('app.redisPort');
  }    

  // token
  get accessTokenExpiration(): string {
    return this.configService.get<string>('token.accessTokenExpiration');
  }  
  get accessTokenExpirationInMillisecond(): number {
    const expiration = this.configService.get<string>('token.accessTokenExpirationInMilliseconds');
    const numbers: number[] = expiration.split('*').map((e) => Number(e));
    return numbers.reduce((partialSum, a) => partialSum * a);
  }      
  get refreshTokenExpiration(): string {
    return this.configService.get<string>('token.refreshTokenExpiration');
  } 
  get secretKey(): string {
    return this.configService.get<string>('token.secretKey');
  }        

  // verification
  get resendDelay(): number {
    const expiration = this.configService.get<string>('verification.resendDelay');
    const numbers: number[] = expiration.split('*').map((e) => Number(e));
    return numbers.reduce((partialSum, a) => partialSum * a);
  } 
  get resendQnty(): number {
    return Number(this.configService.get<string>('verification.resendQnty'));    
  } 
  get codeExpiration(): number {
    const expiration = this.configService.get<string>('verification.codeExpiration');
    const numbers: number[] = expiration.split('*').map((e) => Number(e));
    return numbers.reduce((partialSum, a) => partialSum * a);
  }    
  
  // i18n
  get translateClassValidation(): boolean {
    const res = this.configService.get<string>('i18n.translateClassValidation');
    return res.toLocaleLowerCase() === 'true';
  }   

  // security
  get saltOrRounds(): number {
    return Number(this.configService.get<string>('security.saltOrRounds'));    
  } 
  get checkIP(): boolean {
    const res = this.configService.get<string>('security.checkIP');
    return res.toLocaleLowerCase() === 'true';
  }   
  get checkUserIP(): boolean {
    const res = this.configService.get<string>('security.checkUserIP');
    return res.toLocaleLowerCase() === 'true';
  }   
  get checkUserAgent(): boolean {
    const res = this.configService.get<string>('security.checkUserAgent');
    return res.toLocaleLowerCase() === 'true';
  }           
}
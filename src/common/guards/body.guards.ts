import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
  BadRequestException,
  Inject,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LangService } from '../../utility/language/lang.service';
import { HeaderRequestInterface } from '../../utility/global/interface/header.request.interface';
import { GlobalService } from '../../utility/global/global.service';

@Injectable()
export class BodyGuards implements CanActivate {
  constructor(
    private readonly langService: LangService,
    private readonly globalService: GlobalService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.body.info_lang) {
      const msg = await this.langService.translateError(
        'public',
        'PATTERN_INPUT_NOT_MATCHED',
        process.env.I18N_DEFAULT,
      );
      throw new ForbiddenException(msg);
    } else {
      let ip = req.connection.remoteAddress;
      if (ip == '::1' || ip == '::ffff:127.0.0.1') ip = '127.0.0.1';
      const headerRequestInterface: HeaderRequestInterface = {
        ip: ip,
        http_version: req.httpVersion,
        url: req.url,
        lang: req.body.info_lang,
        method: req.method,
        header: {
          connection: req.headers.connection,
          'sec-ch-ua': req.headers['sec-ch-ua'],
          'sec-ch-ua-mobile': req.headers['sec-ch-ua-mobile'],
          cookie: req.headers.cookie,
          platform: req.headers['sec-ch-ua-platform'],
          host: req.headers.host,
          user_agent: req.headers['user-agent'],
        },
        body: req.body,
        query: req.body,
      };

      this.globalService.headerRequestInterface = headerRequestInterface;

      return true;
    }
  }
}

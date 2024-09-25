import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { join } from 'path';

@Injectable()
export class SwaggerConfigService {
  constructor(private configService: ConfigService) {}

  get isEnable(): boolean {
    const isEnable = this.configService.get<string>('swagger.isEnable');

    return isEnable === 'true';
  }
  get title(): string {
    return this.configService.get<string>('swagger.title');
  }
  get description(): string {
    return this.configService.get<string>('swagger.description');
  }
  get version(): string {
    return this.configService.get<string>('swagger.version');
  }
  get preFix(): string {
    return this.configService.get<string>('swagger.preFix');
  }
  init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .addBearerAuth()
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha', // can also be a function
        operationsSorter: 'alpha', // can also be a function
        docExpansion: 'none', // Collapse  by default
      },
      // customSiteTitle: '',
      // customCssUrl: '../swagger/style.css',
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup(this.preFix, app, document, customOptions);
  }
}

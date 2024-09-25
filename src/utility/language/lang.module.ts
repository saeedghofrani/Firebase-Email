import { Global, Module } from "@nestjs/common";
import { LangService } from './lang.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from 'path';
@Global()
@Module({
    imports: [
      I18nModule.forRoot({
        fallbackLanguage: 'en',
        formatter: (template: string, ...args: any[]) => template,
        loaderOptions: {
          path: path.join(__dirname, '/tools/i18n/'),
          watch: true,
        },
        resolvers: [
          { use: QueryResolver, options: ['lang'] },
          AcceptLanguageResolver,
        ],
      }),
    ],
  providers: [LangService] ,
  exports :[LangService]
})
export class LangModule {}

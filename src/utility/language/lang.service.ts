import { Injectable, NotImplementedException } from "@nestjs/common";
import { I18nService } from 'nestjs-i18n';
import { Translate } from "../../common/models/translate.class";
import { ValidationErrorObject } from "../../common/models/validation-error-object.class";
import errors from "./errors/index"
import dictionary from "./dictionary/index"
@Injectable()
export class LangService {
  constructor(
    private readonly i18nService: I18nService,
  ) {
  }
   getErrors(section : string , value : string) : Object | boolean {
    if (errors[section]==undefined)  return  false
    if (errors[section].values[value]==undefined) return false
    return errors[section].values[value]
  }
  getDictionary(section : string , value : string) : string | boolean {

    if (dictionary[section]==undefined)  return  false
    if (dictionary[section][value]==undefined) return false
    return dictionary[section][value]
  }
  async translate(property: any, locale: string, args: any = null): Promise<Translate> {
    let translate = new Translate();
    translate.code = property;
    const i18n = `i18n.${property}`;
    translate.message = await this.i18nService.translate(i18n, {
      lang: locale,
      args,
    });
    return translate;
  }

  async translateError(section : string ,property: any, locale: string, args: any = null): Promise<Object> {
    let errors = this.getErrors(section,property)
    let translate = new Translate();
    translate.code = errors["value"]
    const i18n = `i18n.${section}.${errors["value"]}`;
    translate.message = await this.i18nService.translate(i18n, {
      lang: locale,
      args,
    });
    return { section , key : errors["key"]  , message : translate.message };
  }

  async translateDictionary(section : string ,property: any, locale: string, args: any = null): Promise<string> {
    let dic = this.getDictionary(section,property)

    let translate = new Translate();
    if (typeof dic === 'string') {
      translate.code = dic;
      const i18n = `i18n.${section}.${dic}`;
      translate.message = await this.i18nService.translate(i18n, {
        lang: locale,
        args,
      });
      return translate.message;
    }
    return ""

  }
  public setKeyToValue(json: any, parent?: string) {
    for (let key in json) {
      if (typeof json[key] === 'string') {
        json[key] = parent ? `${parent}.${key}` : key;
      } else {
        const currentParent = parent ? `${parent}.${key}` : key;
        this.setKeyToValue(json[key], currentParent);
      }
    }
  }

  async translateValidationErrors(validationErrors: string[], locale: string): Promise<{ messages: string[]; codes: string[]; }> {
    const messages = [];
    const codes = [];

    for (const classErrors of validationErrors) {
      const propertyErrors = classErrors.split(', ');
      for (const propertyError of propertyErrors) {
        const args = {};
        if(!this.isJsonString(propertyError)) {
          throw new NotImplementedException('please check: src\\packages\\class-validator, not included this error yet');
        }
        const error: ValidationErrorObject = JSON.parse(propertyError);
        const i18n = `i18n.validation.${error.key}`;
        error.properties.forEach((v) => {
          const key = Object.keys(v)[0];
          args[`$${key}`] = v[key];
        });
        error.constraints.forEach((v) => {
          const key = Object.keys(v)[0];
          args[`$${key}`] = v[key];
        });
        codes.push(error.key);
        const message = await this.i18nService.translate(i18n, {
          lang: 'fa-IR',
          args
        });
        messages.push(message);
      }
    }

    return { messages, codes };
  }

  isJsonString(string: string) {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }
}

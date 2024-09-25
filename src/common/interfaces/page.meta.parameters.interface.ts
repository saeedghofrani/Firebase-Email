import { PageOptionsDto } from '../dto/page.options.dto';
import { BaseOptionsDto } from "../dto/base.options.dto";

export interface PageMetaParametersInterface {
  baseOptionsDto: BaseOptionsDto;
  itemCount: number;
}

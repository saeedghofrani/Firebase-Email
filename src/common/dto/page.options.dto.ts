import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TypeSortEnum } from "../enums/type.sort.enum";
import { BaseOptionsDto } from "./base.options.dto";


export class PageOptionsDto {
  base : BaseOptionsDto
  readonly filed?: string


}

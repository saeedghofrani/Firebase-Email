import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TypeSortEnum } from "../enums/type.sort.enum";


export class BaseOptionsDto {
  @ApiPropertyOptional({ enum: TypeSortEnum, default: TypeSortEnum.ASC })
  @IsEnum(TypeSortEnum)
  @IsOptional()
  readonly order?: TypeSortEnum = TypeSortEnum.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly row?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.row;
  }
}

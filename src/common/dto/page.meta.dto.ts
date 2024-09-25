import { ApiProperty } from '@nestjs/swagger';
import { PageMetaParametersInterface } from '../interfaces/page.meta.parameters.interface';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ baseOptionsDto, itemCount }: PageMetaParametersInterface) {
    this.page = baseOptionsDto.page;
    this.take = baseOptionsDto.row;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

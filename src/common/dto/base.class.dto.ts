import { ApiProperty } from '@nestjs/swagger';

export class BaseClassDto {
  @ApiProperty()
  lang: string;
}

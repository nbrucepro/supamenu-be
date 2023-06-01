import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty({ example: 'stan' })
  client: string;

  @ApiProperty({ example: 'appetizers' })
  starters: string;

  @ApiProperty({ example: 'main-course' })
  entrees: string;

  @ApiProperty({ example: 'chips,' })
  sideDishes: string;

  @ApiProperty({ example: '2each' })
  quantity: string;

  @ApiProperty({ example: 50000 })
  prices: number;
}

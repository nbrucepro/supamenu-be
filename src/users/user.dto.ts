import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'john doe' })
  fullName: string;
  @ApiProperty({ example: '0790169355' })
  phoneNumber: number;
  @ApiProperty({ example: 'john@gmail.com' })
  email: string;
  @ApiProperty({ example: 'pass1' })
  password: string;
}
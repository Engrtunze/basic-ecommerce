import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;
  @IsString()
  @ApiProperty()
  price: string;
  @IsNumber()
  @ApiProperty()
  quantity: number;
  @IsString()
  @ApiProperty()
  description: string;
}

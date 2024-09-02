import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { ProductStatus } from './product.enum';

export class ProductResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: string;
  @ApiProperty({ enum: ProductStatus })
  status: ProductStatus;
  @ApiProperty()
  deleted: boolean;
  @ApiProperty()
  user: UserCreatedDto;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

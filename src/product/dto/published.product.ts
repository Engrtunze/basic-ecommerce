import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { ProductStatus } from './product.enum';

export class PublishedProductResponse {
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
}

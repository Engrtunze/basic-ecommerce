import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { Product } from '../product/product.entity';
import { ProductResponse } from '../product/dto/product.response';
import { PublishedProductResponse } from '../product/dto/published.product';

@Injectable()
export class ProductMapper {
  mapToProductResponse(product: Product): ProductResponse {
    const {
      id,
      name,
      quantity,
      description,
      user,
      price,
      status,
      deleted,
      createdAt,
      updatedAt,
    } = product;

    const userDto: UserCreatedDto = plainToClass(UserCreatedDto, user);

    const productResponse: ProductResponse = {
      id,
      name,
      quantity,
      description,
      status,
      deleted,
      price,
      user: userDto,
      createdAt,
      updatedAt,
    };

    return productResponse;
  }

  mapToPublichedProductResponse(product: Product): PublishedProductResponse {
    const {
      id,
      name,
      quantity,
      description,
      price,
    } = product;

    const publlishedProductResponse: PublishedProductResponse = {
      id,
      name,
      quantity,
      description,
      price,
    };

    return publlishedProductResponse;

    }

  mapToProductRepsonseList(products: Product[]): ProductResponse[] {
    return products.map((product) => this.mapToProductResponse(product));
  }

  mapToPublishedProductRepsonseList(products: Product[]): PublishedProductResponse[] {
    return products.map((product) => this.mapToPublichedProductResponse(product));
  }

}

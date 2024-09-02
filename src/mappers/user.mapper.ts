import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { Product } from '../product/product.entity';
import { ProductResponse } from '../product/dto/product.response';
import { User } from '../user/user.entity';

@Injectable()
export class UserMapper {
  toDto(user: User): UserCreatedDto {
    const dto = new UserCreatedDto();
    dto.id = user.id;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.email = user.email;
    dto.banned = user.isBanned;
    dto.lastLoggedIn = user.lastLoggedIn;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}

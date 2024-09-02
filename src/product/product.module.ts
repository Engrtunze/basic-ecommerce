import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './product.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ProductMapper } from '../mappers/product.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([Product]), JwtModule, UserModule],
  providers: [ProductService, ProductMapper],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

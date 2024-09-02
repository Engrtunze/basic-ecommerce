import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule, ProductModule, UserModule],
  providers: [],
  controllers: [AdminController]
})
export class AdminModule {}

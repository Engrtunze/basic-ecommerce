import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { DatabaseModule } from './config/database.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { InitService } from './init/init.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitService],
})
export class AppModule {}

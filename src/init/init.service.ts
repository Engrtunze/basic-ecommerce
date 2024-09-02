import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/dto/enum/UserRole.enum';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
@Injectable()
export class InitService implements OnModuleInit{
  constructor(private readonly userService: UserService) {}
  async onModuleInit() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set');
    }

    const adminExists = await this.userService.findUserByRole(UserRole.ADMIN);
    if (!adminExists) {
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
      await this.userService.createAdmin({
        firstName: 'Admin',
        lastName: 'Test',
        email: adminEmail,
        password: hashedAdminPassword,
        role: UserRole.ADMIN
      });
      console.log('Admin account created with email: admin@test.com');
    }
  }


}

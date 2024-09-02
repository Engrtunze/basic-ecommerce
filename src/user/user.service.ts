import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserCreatedDto } from './dto/user-created.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserRole } from './dto/enum/UserRole.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
              private readonly userMapper: UserMapper) {}

  async create(request: CreateUserDto) {
    const user = this.userRepository.create(request);
    return this.userRepository.createUser(user);
  }

  async findUser(email: string): Promise<User> {
    try {
     return  await this.userRepository.findOne({ email: email });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findUserById(userId: string): Promise<User> {
    try {
      return  await this.userRepository.findOne(userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllUsers(): Promise<UserCreatedDto[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map(user => this.userMapper.toDto(user));
  }

  async banUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if(user.isBanned === true) {
      throw new InternalServerErrorException("User already banned");
    }
    user.isBanned = true;
    await this.userRepository.nativeUpdate({ id: userId }, user).catch (user => console.log(user));
  }

  async unbanUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if(user.isBanned === false) {
      throw new InternalServerErrorException("User already  unbanned");
    }
    user.isBanned = false;
    await this.userRepository.nativeUpdate({ id: userId }, user).catch (user => console.log(user));
  }

  async findUserByRole(role: UserRole): Promise<User> {
   return  await this.userRepository.findOne({ role: role });
  }

  async createAdmin(userDetails:Partial<User>){
    await this.userRepository.creatAdminUser(userDetails);
  }

}

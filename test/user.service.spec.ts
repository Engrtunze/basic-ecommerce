import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([User])],
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser',
      password: 'password',
    };
    const user = await service.create(createUserDto);
    expect(user).toBeDefined();
    expect(user.firstName).toBe('Test');
  });
});

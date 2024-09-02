import { User } from './user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedDto } from './dto/user-created.dto';

export class UserRepository extends EntityRepository<User> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, User);
  }
  async createUser(user: User) {
    await this.entityManager.persistAndFlush(user);
    return user;
  }
  async findAllUsers(): Promise<User[]> {
   return this.entityManager.find(User, {});
  }

  async creatAdminUser(userDetails : Partial<User>) {
    const user = this.em.create(User, userDetails);
    await this.em.persistAndFlush(user);
  }
}

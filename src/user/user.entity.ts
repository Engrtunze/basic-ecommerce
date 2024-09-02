import {
  Entity,
  EntityRepositoryType, Enum,
  Property,
} from '@mikro-orm/core';

import { UserRepository } from '../user/user.repository';
import { BaseEntity } from '../abstract-base-entity/base.entity';
import { UserRole } from './dto/enum/UserRole.enum';


@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;
  @Property()
  firstName: string;
  @Property()
  lastName: string;
  @Property({ unique: true })
  email: string;
  @Property()
  lastLoggedIn?: Date;
  @Property()
  password: string;
  @Property({default: false})
  isBanned: boolean;
  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

}

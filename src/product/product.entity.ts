import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '../abstract-base-entity/base.entity';
import { User } from '../user/user.entity';
import { ProductStatus } from './dto/product.enum';
import { ProductRepository } from './product.repository';

@Entity({ repository: () => ProductRepository })
export class Product extends BaseEntity {
  [EntityRepositoryType]?: ProductRepository;
  @Property()
  name: string;
  @Property({type: 'string', columnType: 'decimal(15,2'})
  price: string;
  @Property()
  quantity: number
  @Property()
  description: string;
  @ManyToOne(() => User)
  user: User;
  @Enum(() => ProductStatus)
  status: ProductStatus;
  @Property({ default: false })
  deleted: boolean;

}

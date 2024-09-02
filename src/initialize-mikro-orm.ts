import { MikroORM } from '@mikro-orm/core';
import MikroOrmConfig from './mikro-orm.config';

export async function initialzeMikroorm() {
  return MikroORM.init(MikroOrmConfig);
}

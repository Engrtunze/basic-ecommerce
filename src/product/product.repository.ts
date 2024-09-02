import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Product } from './product.entity';
import { ProductStatus } from './dto/product.enum';
import { User } from '../user/user.entity';


export class ProductRepository extends EntityRepository<Product> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Product);
  }
  async createProduct(productData: Product) {
    await this.entityManager.persistAndFlush(productData);
  }

  async findOneApprovedProductByUserId(
    id: string,
    user: User,
  ): Promise<Product | null> {
    return this.findOne({
      id,
      deleted: false,
      user,
      status: {
        $in: [ProductStatus.Approved, ProductStatus.PENDING, ProductStatus.DISAPPROVED]
      },
    });
  }

  async findAllProductByUserId(
    userId: string,
  ): Promise<Product[]> {
   return this.find({ deleted: false, user: { id: userId }, status: [ProductStatus.Approved, ProductStatus.PENDING, ProductStatus.DISAPPROVED] });
  }

  async findAllApprovedProduct(): Promise<Product[]> {
    return this.find({ deleted: false, status: ProductStatus.Approved });
  }

  async findOneProductById(id: string): Promise<Product | null> {
    return this.findOne({ id, deleted: false, status: ProductStatus.PENDING });
  }

}

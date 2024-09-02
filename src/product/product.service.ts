import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DecodeToken } from '../util/jwt-decode-token';
import { ProductStatus } from './dto/product.enum';
import { ProductResponse } from './dto/product.response';
import { ProductMapper } from '../mappers/product.mapper';
import { PublishedProductResponse } from './dto/published.product';

@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly productMapper: ProductMapper
  ) {
  }

  async createProduct(
    userId: string,
    productData: CreateProductDto,
  ): Promise<string> {
    const decodedUserId = await DecodeToken.getUserIdFromToken(
      this.jwtService,
      userId,
    );
    const user = await this.userService.findUserById(decodedUserId);
    const newProduct = this.productRepository.create({
      ...productData,
      user,
      status: ProductStatus.PENDING,
      deleted: false,
    });
    await this.productRepository.createProduct(newProduct);
    return 'Product created successfully and been reviewed by admin check back to view status';
  }

  async updateProduct(
    userId: string,
    productId: string,
    productDto: CreateProductDto,
  ): Promise<ProductResponse> {
    const decodedUserId = await DecodeToken.getUserIdFromToken(
      this.jwtService,
      userId,
    );
    const user = await this.userService.findUserById(decodedUserId);
    const product = await this.productRepository.findOneApprovedProductByUserId(
      productId,
      user,
    );
    if (!product || product.user.id !== user.id) {
      throw new UnauthorizedException('you dont have access to this product');
    }
    if (productDto.name) product.name = productDto.name;
    if (productDto.price) product.price = productDto.price;
    if (productDto.quantity) product.quantity = productDto.quantity;
    if (productDto.description) product.description = productDto.description;
    await this.productRepository.nativeUpdate({ id: productId }, product);
    return this.productMapper.mapToProductResponse(product)
  }

  async deleteProduct(userId: string, productId: string) {
    const decodedUserId = await DecodeToken.getUserIdFromToken(
      this.jwtService,
      userId,
    );
    const user = await this.userService.findUserById(decodedUserId);
    const product = await this.productRepository.findOneApprovedProductByUserId(
      productId,
      user,
    );
    if (!product || product.user.id !== user.id || product.deleted === true) {
      throw new UnauthorizedException('you dont have access to this product or product does not exist');
    }
    product.deleted = true;
    await this.productRepository.createProduct(product);
  }

  async listAllProducts(userId: string): Promise<ProductResponse[]> {
    const decodedUserId = await DecodeToken.getUserIdFromToken(
      this.jwtService,
      userId,
    );
    const user = await this.userService.findUserById(decodedUserId);
    const products = await this.productRepository.findAllProductByUserId(user.id)
    return this.productMapper.mapToProductRepsonseList(products);
  }

  async findByProductId(userId: string, productId: string): Promise<ProductResponse> {
    const decodedUserId = await DecodeToken.getUserIdFromToken(
      this.jwtService,
      userId,
    );
    const user = await this.userService.findUserById(decodedUserId);
    const product = await this.productRepository.findOneApprovedProductByUserId(
      productId,
      user,
    );
    if (!product || product.user.id !== user.id) {
      throw new UnauthorizedException('you dont have access to this product');
    }
    return this.productMapper.mapToProductResponse(product)
  }

  async findAllApprovedProducts(): Promise<PublishedProductResponse[]> {
    const products = await this.productRepository.findAllApprovedProduct();
    return this.productMapper.mapToPublishedProductRepsonseList(products);
  }

  async updateProductStatus(
    productId: string,
    newStatus: ProductStatus)
  {
    const product = await this.productRepository.findOneProductById(productId);
    if (!product || product.deleted === true) {
      throw new NotFoundException('product does not exist');
    }
    if(product.status === ProductStatus.Approved || product.status === ProductStatus.DISAPPROVED){
      throw new BadRequestException('product already approved or disapproved');
    }
   product.status = newStatus
    await this.productRepository.nativeUpdate({ id: productId }, product);
  }
}

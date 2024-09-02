import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponse } from './dto/product.response';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '../user/dto/enum/UserRole.enum';
import { PublishedProductResponse } from './dto/published.product';
import { Public } from '../auth/guards/public-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all-published')
  @Public()
  @ApiOkResponse({ status: HttpStatus.OK, type: [PublishedProductResponse] })
  @ApiOperation({ summary: 'Get all approved products' })
  async getAllProductsByAdmin(): Promise<PublishedProductResponse[]> {
    return this.productService.findAllApprovedProducts();
  }
  @Post('/create')
  @ApiOkResponse({ status: HttpStatus.CREATED, type: String, description: 'Product created successfully and been reviewed by admin check back to to view status' })
  @ApiOperation({ summary: 'Create product' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.USER)
  async createProduct(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
  ): Promise<string> {
    const userId = req.headers['authorization'].split(' ')[1];
    return this.productService.createProduct(userId, createProductDto);
  }

  @Put('/update/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: ProductResponse })
  @ApiOperation({ summary: 'Update product' })
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(UserRole.USER)
  async updateProduct(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto, @Param('id') id: string
  ): Promise<ProductResponse> {
    const userId = req.headers['authorization'].split(' ')[1];
    return this.productService.updateProduct(userId, id, createProductDto);
  }

  @Put('/delete/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: String, description: 'Product deleted successfully' })
  @ApiOperation({ summary: 'Delete product' })
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(UserRole.USER)
  async deleteProduct(
    @Req() req: Request, @Param('id') id: string
  ) {
    const userId = req.headers['authorization'].split(' ')[1];
    return this.productService.deleteProduct(userId, id);
  }

  @Get('/user-products')
  @ApiOkResponse({ status: HttpStatus.OK, type: [ProductResponse] })
  @ApiOperation({ summary: 'Get all products by user' })
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(UserRole.USER)
  async getAllProducts(  @Req() req: Request): Promise<ProductResponse[]> {
    const userId = req.headers['authorization'].split(' ')[1];
    return this.productService.listAllProducts(userId);
  }

  @Get('/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: ProductResponse })
  @ApiOperation({ summary: 'Get product by id' })
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(UserRole.USER)
  async getProductById(
    @Req() req: Request, @Param('id') id: string
  ): Promise<ProductResponse> {
    const userId = req.headers['authorization'].split(' ')[1];
    return this.productService.findByProductId(userId, id);
  }

}

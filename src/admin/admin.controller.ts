import { Body, Controller, Get, HttpStatus, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductStatus } from '../product/dto/product.enum';
import { UserRole } from '../user/dto/enum/UserRole.enum';
import { Roles } from '../auth/guards/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard,RoleGuard)
export class AdminController {
  constructor(private readonly userService : UserService,
              private readonly productService : ProductService
  ) {}

  @Put('/approve-deapprove/:productId')
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'approve or deapprove a product' })
  @Roles(UserRole.ADMIN)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['Pending', 'Approved', 'Disapproved'],
          description: 'Status of the product'
        }
      }
    }
  })
  async approveProduct(@Param('productId') productId: string, @Body('status') status: ProductStatus ) {
    await this.productService.updateProductStatus( productId, status)
  }

  @Get('/users')
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'get all users' })
  @Roles(UserRole.ADMIN)
  async getUsers() {
    return await this.userService.findAllUsers()
  }

  @Put('/ban/:userId')
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'ban a user' })
  @Roles(UserRole.ADMIN)
  async banUser(@Param('userId') userId: string) {
    await this.userService.banUser(userId)
  }

  @Put('/unban/:userId')
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'unban a user' })
  @Roles(UserRole.ADMIN)
  async unbanUser(@Param('userId') userId: string) {
    await this.userService.unbanUser(userId)
  }

}

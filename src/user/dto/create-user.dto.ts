import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from './enum/UserRole.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @IsString()
  @ApiProperty()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}

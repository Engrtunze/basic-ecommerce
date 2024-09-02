import { EntityManager } from '@mikro-orm/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInUserDto } from 'src/user/dto/login.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { DataConflictException } from 'src/exceptions/DataConflictException';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    try {
      const userExist = await this.userService.findUser(
        registrationData.email,
      );
      if (userExist) {
        throw new DataConflictException('This user already exists');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registrationData.password, salt);

      await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
    } catch (err) {
      throw new DataConflictException(err.message);
    }
  }

  async login(request: LogInUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findUser(request.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.isBanned) {
      throw new UnauthorizedException('This user is banned from the system');
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    user.lastLoggedIn = new Date();
    await this.entityManager.persistAndFlush(user);

    return { accessToken };
  }


  async validateUser(request: LogInUserDto): Promise<User> {
    const user = await this.userService.findUser(request.email);

    if (user && (await bcrypt.compare(request.password, user.password))) {
      return user;
    }

    return null;
  }
  async getUserIdFromToken(token: string): Promise<string> {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken.sub;
  }
}

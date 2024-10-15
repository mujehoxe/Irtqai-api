/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface.payload';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
  async register(user: CreateUserDto) {
   
    const newUser = await this.prisma.user.create({
       data: user,
    });
   
    return newUser;
   }
   
  
  async createToken(user: any): Promise<{ accessToken: string }> {
    try {
      const payload: JwtPayload = {
        id: user.userId,
        email: user.email,
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (err) {
      if (err.status) throw err;
      throw new Error('failed to verify email :' + err.message);
    }
  }
}

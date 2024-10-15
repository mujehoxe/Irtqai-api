/* eslint-disable prettier/prettier */
import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface.payload';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      expiresIn: '100000000h',
    });
  }

  async validate(payload: JwtPayload){
    const { id} = payload;
    const user= await this.prisma.user.findUnique({
      where:{
        userId: id,
      }
    });

    console.log(user)
    if (!user) throw new UnauthorizedException('not authenthicated');
    return user;
  }
}

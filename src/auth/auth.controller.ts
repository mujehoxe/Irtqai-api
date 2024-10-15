/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import axios from 'axios';
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(201)
  async register(@Body("name") name:string,@Body("access_token") access_token:string) {
    try {
      const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`);
     const payload = response.data;
     if(payload && payload.email_verified){
      const user = await this.authService.findUserByEmail(payload.email);
      if (!user) {
        const newUser = await this.authService.register({name:name,email:payload.email});
        const token = await this.authService.createToken(newUser);
         return { user: newUser, token: token };
      }else{
        const token = await this.authService.createToken(user);
        return { user: user, token: token };
      }
     }
      
      throw new BadRequestException('user with that email exists');
    } catch (err) {
      console.error(err);
      if (!(err instanceof BadRequestException)) {
        throw new HttpException(
          'Error occurred while trying to create user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

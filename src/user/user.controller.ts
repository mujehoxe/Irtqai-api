import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return users;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      if (user) {
        return user;
      }
      throw new NotFoundException('user not found');
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException('user not found', 404);
      } else {
        throw new HttpException(
          'Error occurred while trying to login the user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Delete('/:userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      if (user) {
        await this.userService.deleteUser(userId);
        return null;
      }
      throw new NotFoundException('user not found');
    } catch (err) {
      if (!(err instanceof NotFoundException)) {
        throw new HttpException(
          'Error occurred while trying to login the user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

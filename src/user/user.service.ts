import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserHokmPositionService } from 'src/user-hokm-position/user-hokm-position.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly userPositionHokmService: UserHokmPositionService,
  ) {}
  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });
    return user;
  }
  async deleteUser(userId: string) {
    const user = await this.prisma.user.delete({
      where: {
        userId,
      },
    });
    return user;
  }
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        UserHokmPositions: true,
      },
    });
    return user;
  }
  async register(user: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    await this.userPositionHokmService.createDefaultUserHokmsPositions(
      newUser.userId,
    );
    return newUser;
  }
}

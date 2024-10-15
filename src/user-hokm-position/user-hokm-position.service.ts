import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserHokmPositionDto } from './dto/create-user-hokm-position.dto';
import { HokmService } from 'src/hokm/hokm.service';
import { UpdateUserHokmPositionDto } from './dto/update-user-hokm-position.dto';

@Injectable()
export class UserHokmPositionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hokmService: HokmService,
  ) {}

  async createUserHokmPosition(
    newUserHokmPosition: CreateUserHokmPositionDto,
    userId: string,
  ) {
    const userHokmPosition = await this.prisma.userHokmPosition.create({
      data: { hokmName: newUserHokmPosition.hokmName, userId: userId },
    });
    return userHokmPosition;
  }

  async createDefaultUserHokmsPositions(userId: string) {
    const hokms = await this.hokmService.getHokms();
    const hokmNames = hokms.map((hokm) => hokm.hokmName);

    const userPositionsHokms = await this.prisma.userHokmPosition.createMany({
      data: hokmNames.map((hokmName) => ({
        userId: userId,
        hokmName: hokmName,
      })),
    });
    return userPositionsHokms;
  }

  //   async createDefaultHokmUsersPosition(hokmName: string, users: any[]) {
  //     const usersIds = users.map((hokm) => hokm.hokmName);

  //     const userPositionsHokms = await this.prisma.userHokmPosition.createMany({
  //       data: usersIds.map((userId) => ({
  //         userId: userId,
  //         hokmName: hokmName,
  //       })),
  //     });
  //     return userPositionsHokms;
  //   }
  async updateUserPositionHokm(
    hokmName: string,
    userId: string,
    updatedUserPositionHokm: UpdateUserHokmPositionDto,
  ) {
    const userPositionHokm = await this.prisma.userHokmPosition.update({
      where: {
        userId_hokmName: {
          userId: userId,
          hokmName: hokmName,
        },
      },
      data: {
        position: updatedUserPositionHokm.position,
      },
    });
    return userPositionHokm;
  }

  async getUserPositionHokm(userId: string, hokmName: string) {
    const userPositionHokm = await this.prisma.userHokmPosition.findUnique({
      where: {
        userId_hokmName: {
          userId: userId,
          hokmName: hokmName,
        },
      },
    });
    return userPositionHokm;
  }
}

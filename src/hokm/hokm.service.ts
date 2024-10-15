import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHokmDto } from './dto/createHokm.dto';

@Injectable()
export class HokmService {
  constructor(private readonly prisma: PrismaService) {}

  async getHokms() {
    const hokms = await this.prisma.hokm.findMany();
    return hokms;
  }
  async getHokm(hokmName: string) {
    const hokm = await this.prisma.hokm.findUnique({
      where: {
        hokmName: hokmName,
      },
      include: {
        hokmLevels: true,
        exemples: true,
      },
    });
    return hokm;
  }
  async deleteHokm(hokmName: string) {
    const deletedHokm = await this.prisma.hokm.delete({
      where: {
        hokmName: hokmName,
      },
    });
    return deletedHokm;
  }
  async createHokm(newHokm: CreateHokmDto) {
    const hokm = await this.prisma.hokm.create({
      data: newHokm,
    });
    return hokm;
  }
}

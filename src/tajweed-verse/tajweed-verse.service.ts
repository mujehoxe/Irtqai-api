import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTajweedVerseDto } from './dto/createTajweedVerse.dto';
import { TajweedVerseQueryParams } from './params/tajweedVerseQuery.params';

@Injectable()
export class TajweedVerseService {
  constructor(private readonly prisma: PrismaService) {}

  async getTajweedVerses(query?: TajweedVerseQueryParams) {
    if (query) {
      const tajweedVerses = await this.prisma.tajweedVerse.findMany({
        where: {
          chapitre_num: query.chapitre_num || undefined,
          hokmName: query.hokmName || undefined,
        },
      });
      return tajweedVerses;
    }
    const tajweedVerses = await this.prisma.tajweedVerse.findMany();
    return tajweedVerses;
  }
  async getTjweedVerseById(tajweedVerseId: string) {
    const tajweedVerse = await this.prisma.tajweedVerse.findUnique({
      where: {
        tajweedVerseId: tajweedVerseId,
      },
    });
    return tajweedVerse;
  }

  async createTajweedVerse(
    newTajweedVerse: CreateTajweedVerseDto,
    audioUrl: string,
  ) {
    const newTajweedVersee = { ...newTajweedVerse, audioUrl: audioUrl };
    const tajweedVerse = await this.prisma.tajweedVerse.create({
      data: newTajweedVersee,
    });
    return tajweedVerse;
  }

  async deleteTajweedVerse(tajweedVerseId: string) {
    const deletedTajweedVerse = await this.prisma.tajweedVerse.delete({
      where: {
        tajweedVerseId: tajweedVerseId,
      },
    });
    return deletedTajweedVerse;
  }
}

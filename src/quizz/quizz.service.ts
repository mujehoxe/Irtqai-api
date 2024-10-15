import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizzDto } from './dto/createQuizz.dto';
import { QuizzQuery } from './params/quizz.query';

@Injectable()
export class QuizzService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuizzes(query: QuizzQuery) {
    if (query) {
      const quizzes = await this.prisma.quizz.findMany({
        where: {
          hokmName: query.hokmName || undefined,
          type: query.type || undefined,
        },
      });
      return quizzes;
    }
    const quizzes = await this.prisma.quizz.findMany();
    return quizzes;
  }

  async getQuizz(quizzId: number) {
    const quizz = await this.prisma.quizz.findUnique({
      where: {
        quizzId: quizzId,
      },
    });
    return quizz;
  }

  async deleteQuizz(quizzId: number) {
    const quizz = await this.prisma.quizz.delete({
      where: {
        quizzId: quizzId,
      },
    });
    return quizz;
  }

  async createQuizz(quizz: CreateQuizzDto) {
    const newQuizz = await this.prisma.quizz.create({
      data: quizz,
    });
    return newQuizz;
  }
}

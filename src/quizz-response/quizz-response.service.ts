import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizzResponsDto } from './dto/createQuizz-response.dto';
import { QuizzResponseQuery } from './params/quizz-response.query';
import { QuizzResponseParams } from './params/quizz-response.params';

@Injectable()
export class QuizzResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query?: QuizzResponseQuery) {
    if (query) {
      const quizzesResponses = await this.prisma.quizResponse.findMany({
        where: {
          userId: query.userId || undefined,
          quizzId: query.quizzId || undefined,
        },
      });
      return quizzesResponses;
    }
    const quizzesResponses = await this.prisma.quizResponse.findMany();
    return quizzesResponses;
  }

  async create(
    newQuizzResponse: CreateQuizzResponsDto,
    audio_url: string,
    userId: string,
  ) {
    const quizResponse = await this.prisma.quizResponse.create({
      data: {
        userId: userId,
        quizzId: newQuizzResponse.quizzId,
        audio_url: audio_url,
      },
    });
    return quizResponse;
  }

  async getQuizzResponse(params: QuizzResponseParams) {
    const quizResponse = await this.prisma.quizResponse.findFirst({
      where: {
        userId: params.userId,
        quizzId: params.quizzId,
      },
    });
    return quizResponse;
  }

  async delete(params: QuizzResponseParams) {
    const quizResponse = await this.prisma.quizResponse.delete({
      where: {
        quizzId_userId: {
          userId: params.userId,
          quizzId: params.quizzId,
        },
      },
    });
    return quizResponse;
  }
}

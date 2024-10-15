import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { CreateQuizzDto } from './dto/createQuizz.dto';
import { QuizzQuery } from './params/quizz.query';

@Controller('api/v1/quizz')
export class QuizzController {
  constructor(private readonly service: QuizzService) {}

  @Get()
  async getAll(@Query() query: QuizzQuery) {
    try {
      const quizzes = await this.service.getQuizzes(query);
      return quizzes;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error occurred while getting all quizzes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':quizzId')
  async getOne(@Param('quizzId') quizzId: number) {
    try {
      const quizz = await this.service.getQuizz(quizzId);
      if (!quizz) throw new NotFoundException();
      return quizz;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('quizz not found');
      } else {
        throw new HttpException(
          'Error occurred while getting all quizzes',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':quizzId')
  @HttpCode(204)
  async delete(@Param('quizzId') quizzId: number) {
    try {
      const quizz = await this.service.getQuizz(quizzId);
      if (!quizz) throw new NotFoundException();
      await this.service.deleteQuizz(quizzId);
      return null;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('quizz not found');
      } else {
        throw new HttpException(
          'Error occurred while getting quizz',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  async create(@Body() newQuizz: CreateQuizzDto) {
    try {
      const quizz = await this.service.createQuizz(newQuizz);
      return quizz;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('quizz not found');
      } else {
        throw new HttpException(
          'Error occurred while creating quizz',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

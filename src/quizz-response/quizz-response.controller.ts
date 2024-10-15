import {
  BadRequestException,
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
  UploadedFile,
} from '@nestjs/common';
import { QuizzService } from 'src/quizz/quizz.service';
import { QuizzResponseService } from './quizz-response.service';
import { QuizzResponseQuery } from './params/quizz-response.query';
import { QuizzResponseParams } from './params/quizz-response.params';
import { CreateQuizzResponsDto } from './dto/createQuizz-response.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { UploadFile } from 'src/config/cloudinary/upload.interceptor';
import { uploadToCloudinary } from 'src/config/cloudinary';
import { quranSpeachToText, checkQuizResponse } from 'src/utils/aiApiRequests';
import { remove as fseRemove } from 'fs-extra';
@Controller('api/v1/quizz-response')
export class QuizzResponseController {
  constructor(
    private readonly quizzService: QuizzService,
    private readonly quizzResponseService: QuizzResponseService,
  ) {}

  @Get()
  async getAll(@Query() query: QuizzResponseQuery) {
    try {
      const quizzes = await this.quizzResponseService.getAll(query);
      return quizzes;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error occurred while getting response quizzes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':userId/:quizzId')
  async get(@Param() params: QuizzResponseParams) {
    try {
      const quizzResponse = await this.quizzResponseService.getQuizzResponse(
        params,
      );
      if (!quizzResponse) throw new NotFoundException();
      return quizzResponse;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException)
        throw new NotFoundException('no quiz response found');
      throw new HttpException(
        'Error occurred while getting response quizz',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':userId/:quizzId')
  @HttpCode(204)
  async delete(@Param() params: QuizzResponseParams) {
    try {
      const quizzResponse = await this.quizzResponseService.getQuizzResponse(
        params,
      );
      if (!quizzResponse) throw new NotFoundException();
      await this.quizzResponseService.delete(params);
      return quizzResponse;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException)
        throw new NotFoundException('no quiz response found');
      throw new HttpException(
        'Error occurred while deleting response quizz',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  @UploadFile()
  @HttpCode(201)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('quizzId') quizzId: number,
  ) {
    try {
      const cloudinaryPath = await uploadToCloudinary(file.path);
      //   const quizz = await this.quizzService.getQuizz(quizzId * 1);
      //   if (!quizz) throw new NotFoundException();

      //   const newQuizzResponse = await this.quizzResponseService.create(
      //     quizzId * 1,
      //     cloudinaryPath,
      //     user.userId,
      //   );
      //   const text = await quranSpeachToText(cloudinaryPath);
      //   if (!text)
      //     throw new BadRequestException(
      //       'there is no relation between audio_url and the quizz text',
      //     );
      // const response = await checkQuizResponse(newQuizzResponse);
      //   console.log(response);
      return cloudinaryPath;
    } catch (err) {
      fseRemove(file.path);
      console.error(err);
      if (err instanceof NotFoundException) {
        throw err;
      } else if (err instanceof BadRequestException) {
        throw err;
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } finally {
      fseRemove(file.path);
    }
  }
}

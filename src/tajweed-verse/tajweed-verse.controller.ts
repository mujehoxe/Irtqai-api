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
  UploadedFile,
} from '@nestjs/common';
import { remove as fseRemove } from 'fs-extra';
import { TajweedVerseService } from './tajweed-verse.service';
import { TajweedVerseQueryParams } from './params/tajweedVerseQuery.params';
import { CreateTajweedVerseDto } from './dto/createTajweedVerse.dto';
import { HokmService } from 'src/hokm/hokm.service';
import { UploadFile, uploadToCloudinary } from 'src/config/cloudinary';

@Controller('api/v1/tajweed-verse')
export class TajweedVerseController {
  constructor(
    private readonly tajweedVerseService: TajweedVerseService,
    private readonly hokmService: HokmService,
  ) {}

  @Get()
  async getAll(@Query() query: TajweedVerseQueryParams) {
    try {
      const tajweedVerses = await this.tajweedVerseService.getTajweedVerses(
        query,
      );
      return tajweedVerses;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error occurred while getting tajweedVerses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':verseId')
  async getOne(@Param('verseId') verseId: string) {
    try {
      const tajweedVerse = await this.tajweedVerseService.getTjweedVerseById(
        verseId,
      );
      if (!tajweedVerse) {
        throw new NotFoundException();
      }
      return tajweedVerse;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('there is no tajweed verse with that id');
      } else {
        throw new HttpException(
          'Error occurred while getting tajweedVerse',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':verseId')
  @HttpCode(204)
  async delete(@Param('verseId') verseId: string) {
    try {
      const tajweedVerse = await this.tajweedVerseService.getTjweedVerseById(
        verseId,
      );
      if (!tajweedVerse) {
        throw new NotFoundException();
      }
      await this.tajweedVerseService.deleteTajweedVerse(verseId);
      return null;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('there is no tajweed verse with that id');
      } else {
        throw new HttpException(
          'Error occurred while deleting tajweedVerse',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  @UploadFile()
  @HttpCode(201)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() newTajweedVerse: CreateTajweedVerseDto,
  ) {
    try {
      const hokm = await this.hokmService.getHokm(newTajweedVerse.hokmName);
      if (!hokm) {
        throw new NotFoundException();
      }
      const cloudinaryPath = await uploadToCloudinary(file.path);
      const TajweedVerse = await this.tajweedVerseService.createTajweedVerse(
        newTajweedVerse,
        cloudinaryPath,
      );
      return TajweedVerse;
    } catch (err) {
      fseRemove(file.path);
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('there is no hokm with that name');
      } else {
        throw new HttpException(
          'Error occurred while deleting tajweedVerse',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

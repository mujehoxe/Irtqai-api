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
} from '@nestjs/common';
import { HokmService } from './hokm.service';
import { CreateHokmDto } from './dto/createHokm.dto';

@Controller('api/v1/hokm')
export class HokmController {
  constructor(private readonly service: HokmService) {}

  @Get()
  async getAll() {
    try {
      const hokms = await this.service.getHokms();
      return hokms;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error occurred while getting hokms',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':hokmName')
  async getOne(@Param('hokmName') hokmName: string) {
    try {
      const hokm = await this.service.getHokm(hokmName);
      if (!hokm) {
        throw new NotFoundException();
      }
      return hokm;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('there is no hokm with that name');
      } else {
        throw new HttpException(
          'Error occurred while getting hokm',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  async create(@Body() newHokm: CreateHokmDto) {
    try {
      const oldHokm = await this.service.getHokm(newHokm.hokmName);
      if (oldHokm) {
        throw new BadRequestException();
      }
      const hokm = await this.service.createHokm(newHokm);
      return hokm;
    } catch (err) {
      console.error(err);
      if (err instanceof BadRequestException) {
        throw new BadRequestException('there is hokm with that name');
      } else {
        throw new HttpException(
          'Error occurred while creating hokm',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Delete(':hokmName')
  @HttpCode(204)
  async delete(@Param('hokmName') hokmName: string) {
    try {
      const hokm = await this.service.getHokm(hokmName);
      if (!hokm) {
        throw new NotFoundException();
      }
      await this.service.deleteHokm(hokmName);
      return null;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException('there is no hokm with that name');
      } else {
        throw new HttpException(
          'Error occurred while deleting hokm',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

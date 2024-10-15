import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserHokmPositionService } from './user-hokm-position.service';
import { HokmService } from '../hokm/hokm.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';
import { UpdateUserHokmPositionDto } from './dto/update-user-hokm-position.dto';

@Controller('api/v1/user-hokm-position')
export class UserHokmPositionController {
  constructor(
    private readonly userPositionHokmService: UserHokmPositionService,
    private readonly hokmService: HokmService,
  ) {}

  @Put(':/hokmName')
  @UseGuards(AuthGuard('jwt'))
  async updateUserHokmPosition(
    @Param('hokmName') hokmName: string,
    @GetUser() user: any,
    @Body() data: UpdateUserHokmPositionDto,
  ) {
    try {
      const hokm = await this.hokmService.getHokm(hokmName);
      if (!hokm) throw new NotFoundException('no hokm found with that name');

      const updatedUserHokmPosition =
        await this.userPositionHokmService.updateUserPositionHokm(
          hokmName,
          user.userId,
          data,
        );
      return updatedUserHokmPosition;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Error occurred while update userHokmPosition',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserHokmPositionDto {
  @IsString()
  @IsNotEmpty()
  position:string
}

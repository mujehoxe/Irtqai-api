/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserHokmPositionDto {
  @IsNotEmpty()
  @IsString()
  hokmName: string;
}

/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHokmDto {
  @IsNumber()
  level: number;
  @IsNotEmpty()
  @IsString()
  hokmName: string;
  @IsNotEmpty()
  @IsString()
  arabicName:string
}
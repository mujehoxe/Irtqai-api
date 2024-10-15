/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TajweedVerseQueryParams {
  @IsOptional()
  @IsNumber()
  chapitre_num: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hokmName: string;
}

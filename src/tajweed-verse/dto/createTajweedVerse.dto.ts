/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTajweedVerseDto {
  @IsNumber()
  chapitre_num: number;
  @IsNumber()
  verse_num: number;
  @IsNotEmpty()
  @IsString()
  hokmName: string;
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}

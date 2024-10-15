/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateQuizzDto {
  @IsNumber()
  point: number;
  @IsNotEmpty()
  @IsString()
  hokmName:string
  @IsNumber()
  chapitre_num:number
  @IsNumber()
  verse_num:number
  @IsNotEmpty()
  @IsString()
  text:string

  @IsNotEmpty()
  @IsString()
  type:string
}

/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class QuizzResponseQuery {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsOptional()
  @IsNumber()
  quizzId: number;
}

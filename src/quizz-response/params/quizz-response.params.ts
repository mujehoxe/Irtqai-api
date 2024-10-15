/* eslint-disable prettier/prettier */
import {   IsNumber, IsString} from 'class-validator';

export class QuizzResponseParams {
  @IsNumber()
  quizzId: number;
  @IsString()
    userId:string
}

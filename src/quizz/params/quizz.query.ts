/* eslint-disable prettier/prettier */
import { IsOptional, IsString} from 'class-validator';

export class QuizzQuery {
  @IsOptional()
  @IsString()
  hokmName:string
  @IsOptional()
  @IsString()
  type:string
}
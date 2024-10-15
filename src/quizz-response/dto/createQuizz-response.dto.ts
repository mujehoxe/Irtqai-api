/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional} from 'class-validator';

export class CreateQuizzResponsDto {
  @IsOptional()
  @IsNumber()
  quizzId: number;
}

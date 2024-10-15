import { Module } from '@nestjs/common';
import { QuizzResponseService } from './quizz-response.service';
import { QuizzResponseController } from './quizz-response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { QuizzModule } from 'src/quizz/quizz.module';

@Module({
  imports: [PrismaModule, AuthModule, QuizzModule],
  providers: [QuizzResponseService],
  controllers: [QuizzResponseController],
})
export class QuizzResponseModule {}

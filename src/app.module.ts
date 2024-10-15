import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TajweedVerseModule } from './tajweed-verse/tajweed-verse.module';
import { HokmModule } from './hokm/hokm.module';
import { QuizzResponseModule } from './quizz-response/quizz-response.module';
import { QuizzModule } from './quizz/quizz.module';
import { VerseModule } from './verse/verse.module';
// import { AchievementModule } from './achievement/achievement.module';
import { UserHokmPositionModule } from './user-hokm-position/user-hokm-position.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    TajweedVerseModule,
    HokmModule,
    QuizzResponseModule,
    QuizzModule,
    VerseModule,
    UserHokmPositionModule,
    // AchievementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

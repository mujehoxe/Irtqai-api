import { Module } from '@nestjs/common';
import { TajweedVerseController } from './tajweed-verse.controller';
import { TajweedVerseService } from './tajweed-verse.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HokmModule } from 'src/hokm/hokm.module';

@Module({
  imports: [PrismaModule, HokmModule],
  controllers: [TajweedVerseController],
  providers: [TajweedVerseService],
})
export class TajweedVerseModule {}

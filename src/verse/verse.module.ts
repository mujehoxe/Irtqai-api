import { Module } from '@nestjs/common';
import { VerseService } from './verse.service';
import { VerseController } from './verse.controller';

@Module({
  providers: [VerseService],
  controllers: [VerseController]
})
export class VerseModule {}

import { Module } from '@nestjs/common';
import { HokmController } from './hokm.controller';
import { HokmService } from './hokm.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HokmController],
  providers: [HokmService],
  exports: [HokmService],
})
export class HokmModule {}

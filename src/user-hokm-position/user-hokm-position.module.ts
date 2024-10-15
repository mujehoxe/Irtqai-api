import { Module } from '@nestjs/common';
import { UserHokmPositionService } from './user-hokm-position.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HokmModule } from 'src/hokm/hokm.module';
import { UserHokmPositionController } from './user-hokm-position.controller';

@Module({
  imports: [PrismaModule, HokmModule],
  providers: [UserHokmPositionService],
  exports: [UserHokmPositionService],
  controllers: [UserHokmPositionController],
})
export class UserHokmPositionModule {}

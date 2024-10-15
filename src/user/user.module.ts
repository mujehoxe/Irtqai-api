import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserHokmPositionModule } from 'src/user-hokm-position/user-hokm-position.module';

@Module({
  imports: [PrismaModule, UserHokmPositionModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

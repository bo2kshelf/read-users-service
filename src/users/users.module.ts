import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CommonConfig} from '../configs/common.config';
import {PrismaModule} from '../prisma/prisma.module';
import {UsersResolver} from './users.resolver';
import {UsersService} from './users.service';

@Module({
  imports: [ConfigModule.forFeature(CommonConfig), PrismaModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}

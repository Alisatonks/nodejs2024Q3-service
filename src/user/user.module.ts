import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomUser } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

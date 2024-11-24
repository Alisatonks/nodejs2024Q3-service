import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomUser } from 'src/user/user.entity';

@Module({
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([CustomUser]),
    JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: "3600s"}
  })]
})
export class AuthModule {}

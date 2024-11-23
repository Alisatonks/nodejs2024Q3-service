import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  providers: [AuthService, UserService, JwtService, LocalStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: "3600s"}
  })]
})
export class AuthModule {}

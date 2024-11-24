import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CustomUser } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, passw: string) {
    const user = await this.userService.findUserWithLogin(login);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(passw, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password, ...rest } = user;
    return rest;
  }

  async login(user: CustomUser) {
    const payload = { userId: user.id, login: user.login };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(
    dto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = dto;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      if (!decoded.userId || !decoded.login) {
        throw new ForbiddenException('Invalid token payload');
      }

      const user = await this.userService.getUserById(decoded.userId);
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const payload = {
        userId: user.id,
        login: user.login,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '60s',
      });

      const newRefreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError' ||
        error.message === 'invalid token' ||
        error.message === 'jwt malformed'
      ) {
        throw new ForbiddenException(
          error.name === 'TokenExpiredError'
            ? 'Refresh token expired'
            : 'Invalid refresh token',
        );
      }

      throw new ForbiddenException('Could not refresh token');
    }
  }
}

import { ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_REFRESH_KEY}`,
      handleJWTError: true,
    });
  }

  async validate(payload: any) {
    if (!payload.userId || !payload.login) {
      throw new ForbiddenException('Invalid token payload');
    }
    return {
      user: payload.userId,
      username: payload.login,
    };
  }
}

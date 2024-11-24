import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET_KEY}`,
        })
    }

    async validate(payload: any) {
        return {
            user: payload.sub,
            username: payload.username
        }
    }
}
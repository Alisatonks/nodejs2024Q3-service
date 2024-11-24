import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CustomUser } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService, private jwtService: JwtService ){}

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

    async login(user:CustomUser ) {
        const payload = { sub: user.id, username: user.login };
        return {
            ...user, 
            accessToken: this.jwtService.sign(payload),
        }
    }
}

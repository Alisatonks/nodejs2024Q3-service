import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {};

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    async postUser() {
        return this.userService.postUsers();
    }
}

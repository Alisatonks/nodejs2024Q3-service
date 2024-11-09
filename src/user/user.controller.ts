import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {};

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return this.userService.getUserById(id)
    }

    @Post()
    async postUser(@Body() user: CreateUserDto) {
        return this.userService.postUser(user);
    }

    
}

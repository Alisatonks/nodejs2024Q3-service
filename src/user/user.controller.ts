import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async postUser(@Body() user: CreateUserDto) {
    return this.userService.postUser(user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() password: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, password);
  }
}

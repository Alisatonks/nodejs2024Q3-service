import { Injectable, HttpException } from '@nestjs/common';
import { ReturnedUser } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { validateId } from 'src/utils/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(CustomUser)
    private usersRepository: Repository<CustomUser>,
  ) {}

  public async getUsers(): Promise<ReturnedUser[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  public async getUserById(id: string): Promise<ReturnedUser> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async findUserWithLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }

  public async postUser(user: CreateUserDto): Promise<ReturnedUser> {
    const createdAt = Date.now();
    const newUser = this.usersRepository.create({
      ...user,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    });
    const savedUser = await this.usersRepository.save(newUser);
    const { password, ...rest } = savedUser;
    return rest;
  }

  public async deleteUser(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }

    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting user with id ${id}: ${error.message}`,
        500,
      );
    }
  }

  public async updatePassword(
    id: string,
    passwords: UpdatePasswordDto,
  ): Promise<ReturnedUser> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    if (user.password !== passwords.oldPassword) {
      throw new HttpException(`Provided password is not valid`, 403);
    }
    user.password = passwords.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const updatedUser = await this.usersRepository.save(user);
    const { password, ...rest } = updatedUser;
    return rest;
  }
}

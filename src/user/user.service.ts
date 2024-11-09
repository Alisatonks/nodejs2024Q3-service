import { Injectable, HttpException } from '@nestjs/common';
import {
  findUser,
  validateId,
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updatePswd,
  validatePassword,
} from './user.utils';
import { ReturnedUser } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  public async getUsers(): Promise<ReturnedUser[]> {
    const users = getUsers();
    return users;
  }

  public async getUserById(id: string): Promise<ReturnedUser> {
    const user = findUser(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(getUser(user));
    });
  }

  public async postUser(user: CreateUserDto): Promise<ReturnedUser> {
    return new Promise((resolve) => {
      return resolve(addUser(user));
    });
  }

  public async deleteUser(id: string): Promise<void> {
    const user = findUser(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteUser(id));
    });
  }

  public async updatePassword(
    id: string,
    passwords: UpdatePasswordDto,
  ): Promise<ReturnedUser> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const user = findUser(id);
    if (!user) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    if (!validatePassword(id, passwords)) {
      throw new HttpException(`Provided password is not valid`, 403);
    }
    return new Promise((resolve) => {
      return resolve(updatePswd(id, passwords));
    });
  }
}

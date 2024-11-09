import { Injectable, HttpException } from '@nestjs/common';
import { USERS, findUser, validateId, addUser, getUsers, getUser } from './user.utils';
import { ReturnedUser, User } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {

    public async getUsers(): Promise<ReturnedUser[]>{
        const users = getUsers();
        return users;
    }

    public async getUserById(id: string): Promise<ReturnedUser> {
        const user = findUser(id);
        const validId = validateId(id);
        if(!validId) {
            throw new HttpException(`Id ${id} is not valid`, 400)
        }
        if(!user) {
            throw new HttpException(`User id ${id} does not exist`, 404)
        }
        return new Promise((resolve) => {
            return resolve(getUser(user));
        })
       
    }

    public async postUser(user: CreateUserDto): Promise<any> {
        return new Promise((resolve) => {
            return resolve(addUser(user));
        })
    }
}

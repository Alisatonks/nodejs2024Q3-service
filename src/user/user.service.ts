import { Injectable, HttpException } from '@nestjs/common';
import { USERS, findUser, validateId } from './users.db';

@Injectable()
export class UserService {

    private users = USERS.map(({password, ...rest}) => rest);

    public async getUsers() {
        return this.users;
    }

    public async postUsers(user) {

    }

    public async getUserById(id: string) {
        const user = findUser(id);
        const validId = validateId(id);
        if(!validId) {
            throw new HttpException(`Id ${id} is not valid`, 400)
        }
        if(!user) {
            throw new HttpException(`User id ${id} does not exist`, 404)
        }
        return user;
    }
}

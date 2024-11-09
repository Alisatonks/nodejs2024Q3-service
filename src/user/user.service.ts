import { Injectable } from '@nestjs/common';
import { USERS } from './users.db';

@Injectable()
export class UserService {

    private users = USERS.map(({password, ...rest}) => rest);
    public async getUsers() {
        console.log(this.users)
        return this.users;
    }
}

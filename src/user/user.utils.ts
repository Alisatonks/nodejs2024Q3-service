import { User } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';
import * as crypto from 'crypto';

export const USERS = [
    {
        "id": "6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b7",
        "login": "username123",
        "password": "securePassword",
        "version": 1,
        "createdAt": 1700000000000,
        "updatedAt": 1700000000000
      }
]

export const getUsers = () => USERS.map(({password, ...rest}) => rest);

export const getUser = ({password, ...rest}: User) => {return rest} 

export const findUser = (id: string) => {
  return USERS.find(user => user.id === id);
}

export const validateId = (id: string) => {
  const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regExp.test(id);
}

export const addUser = (user: CreateUserDto) => {
  const id = crypto.randomUUID();
  const {login, password} = user;
  const createdAt = Date.now();
  const newUser = {
    "id": id,
    "login": login,
    "password": password,
    "version": 1,
    "createdAt": createdAt,
    "updatedAt": createdAt
  }
  USERS.push(newUser);
  console.log(USERS)
  return getUser(newUser);
}
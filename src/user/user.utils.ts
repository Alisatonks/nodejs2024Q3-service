import { User } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { findIndex } from 'src/utils/helpers';

export const USERS = [
  {
    id: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b7',
    login: 'username123',
    password: 'securePassword',
    version: 1,
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
  },
];

export const getUsers = () => USERS.map(({ password, ...rest }) => rest);

export const getUser = ({ password, ...rest }: User) => {
  return rest;
};

export const findUser = (id: string) => {
  return USERS.find((user) => user.id === id);
};

export const addUser = (user: CreateUserDto) => {
  const id = crypto.randomUUID();
  const { login, password } = user;
  const createdAt = Date.now();
  const newUser = {
    id: id,
    login: login,
    password: password,
    version: 1,
    createdAt: createdAt,
    updatedAt: createdAt,
  };
  USERS.push(newUser);
  return getUser(newUser);
};

export const deleteUser = (id: string) => {
  const index = findIndex(id, USERS);
  if (index !== -1) {
    USERS.splice(index, 1);
  }
};

export const validatePassword = (id: string, passwords: UpdatePasswordDto) => {
  const index = findIndex(id, USERS);
  if (passwords.oldPassword === USERS[index].password) {
    return true;
  }
  return false;
};

export const updatePswd = (id: string, passwords: UpdatePasswordDto) => {
  const index = findIndex(id, USERS);
  let newUser: User;
  if (index !== -1) {
    newUser = USERS[index];
    newUser.password = passwords.newPassword;
    newUser.version += 1;
    const updatedAt = Date.now();
    newUser.updatedAt = updatedAt;
    USERS.splice(index, 1, newUser);
  }
  return getUser(newUser);
};

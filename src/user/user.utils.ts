import { User } from 'src/types';
import { CreateUserDto } from './dto/createUser.dto';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

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

const findIndex = (id: string) => {
  return USERS.findIndex((user) => user.id === id);
};

export const getUsers = () => USERS.map(({ password, ...rest }) => rest);

export const getUser = ({ password, ...rest }: User) => {
  return rest;
};

export const findUser = (id: string) => {
  return USERS.find((user) => user.id === id);
};

export const validateId = (id: string) => {
  const regExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regExp.test(id);
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
  const index = findIndex(id);
  if (index !== -1) {
    USERS.splice(index, 1);
  }
};

export const validatePassword = (id: string, passwords: UpdatePasswordDto) => {
  const index = findIndex(id);
  if (passwords.oldPassword === USERS[index].password) {
    return true;
  }
  return false;
};

export const updatePswd = (id: string, passwords: UpdatePasswordDto) => {
  const index = findIndex(id);
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

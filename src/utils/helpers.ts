import { Album, Artist, Track, User } from 'src/types';

export const findIndex = (
  id: string,
  array: User[] | Artist[] | Album[] | Track[],
) => {
  return array.findIndex((el: User | Artist | Album | Track) => el.id === id);
};

export const validateId = (id: string) => {
  const regExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regExp.test(id);
};

import { findIndex } from 'src/utils/helpers';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { Album } from 'src/types';

export const ALBUMS = [
  {
    id: '5b1f52c1-5d8a-4b9c-95ed-d9a9f4a4e8b9',
    name: 'Something wild',
    year: 2010,
    artistId: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b8',
  },
  {
    id: '5b1f52c1-5d8a-4b9c-95ed-d9a9f4a4e8b9',
    name: 'Madness',
    year: 2008,
    artistId: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a4e8b9',
  },
];

export const findAlbum = (id: string) => {
  return ALBUMS.find((alb) => alb.id === id);
};

export const addAlbum = (album: CreateAlbumDto) => {
  const id = crypto.randomUUID();
  const { name, year, artistId } = album;
  const newAlbum = {
    id: id,
    name: name,
    year: year,
    artistId: artistId,
  };
  ALBUMS.push(newAlbum);
  return newAlbum;
};

export const updateAlb = (id: string, newData: CreateAlbumDto) => {
  const index = findIndex(id, ALBUMS);
  let newAlbum: Album;
  if (index !== -1) {
    newAlbum = ALBUMS[index];
    newAlbum.name = newData.name;
    newAlbum.year = newData.year;
    newAlbum.artistId = newData.artistId;
    ALBUMS.splice(index, 1, newAlbum);
  }
  return newAlbum;
};

export const deleteAlbum = (id: string) => {
  const index = findIndex(id, ALBUMS);
  if (index !== -1) {
    ALBUMS.splice(index, 1);
  }
};

export const deleteRef = (artistId: string) => {
  const newAlbum = ALBUMS.find((alb) => alb.artistId === artistId);
  if (newAlbum) {
    newAlbum.artistId = null;
  }
};

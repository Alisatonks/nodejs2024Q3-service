import { Artist } from 'src/types';
import { CreateArtistDto } from './dto/createArtist.dto';
import { findIndex } from 'src/utils/helpers';
import { deleteAlbumRef } from 'src/album/album.utils';
import { deleteTrackRef } from 'src/track/track.utils';

export const ARTISTS = [
  {
    id: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b8',
    name: '30 Seconds to Mars',
    grammy: true,
  },
  {
    id: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a4e8b9',
    name: 'Muse',
    grammy: true,
  },
];

export const findArtist = (id: string) => {
  return ARTISTS.find((user) => user.id === id);
};

export const addArtist = (user: CreateArtistDto) => {
  const id = crypto.randomUUID();
  const { name, grammy } = user;
  const newArtist = {
    id: id,
    name: name,
    grammy: grammy,
  };
  ARTISTS.push(newArtist);
  return newArtist;
};

export const updateArts = (id: string, newData: CreateArtistDto) => {
  const index = findIndex(id, ARTISTS);
  let newArtist: Artist;
  if (index !== -1) {
    newArtist = ARTISTS[index];
    newArtist.name = newData.name;
    newArtist.grammy = newData.grammy;
    ARTISTS.splice(index, 1, newArtist);
  }
  return newArtist;
};

export const deleteArtist = (id: string) => {
  const index = findIndex(id, ARTISTS);
  if (index !== -1) {
    ARTISTS.splice(index, 1);
    deleteAlbumRef(id);
    deleteTrackRef(id, 'artistId');
  }
};

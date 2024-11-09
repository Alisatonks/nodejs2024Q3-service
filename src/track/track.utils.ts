import { findIndex } from 'src/utils/helpers';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from 'src/types';

export const TRACKS = [
  {
    id: '7b1f52c1-2d8a-4b9c-95ed-d9a9f6a3e8b8',
    name: 'Higher',
    artistId: '6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b8',
    albumId: '5b1f52c1-5d8a-4b9c-95ed-d9a9f4a4e8b9',
    duration: 120,
  },
];

export const findTrack = (id: string) => {
  return TRACKS.find((track) => track.id === id);
};

export const addTrack = (track: CreateTrackDto) => {
  const id = crypto.randomUUID();
  const { name, artistId, albumId, duration } = track;
  const newTrack = {
    id: id,
    name: name,
    artistId: artistId,
    albumId: albumId,
    duration: duration,
  };
  TRACKS.push(newTrack);
  return newTrack;
};

export const updateTrack = (id: string, newData: CreateTrackDto) => {
  const index = findIndex(id, TRACKS);
  let newTrack: Track;
  if (index !== -1) {
    newTrack = TRACKS[index];
    newTrack.name = newData.name;
    newTrack.artistId = newData.artistId;
    newTrack.albumId = newData.albumId;
    newTrack.duration = newData.duration;
    TRACKS.splice(index, 1, newTrack);
  }
  return newTrack;
};

export const deleteTrack = (id: string) => {
  const index = findIndex(id, TRACKS);
  if (index !== -1) {
    TRACKS.splice(index, 1);
  }
};

export const deleteTrackRef = (targetId: string, target: string) => {
  const filtered = TRACKS.filter((track) => track[target] === targetId);
  filtered.forEach((el) => (el[target] = null));
};

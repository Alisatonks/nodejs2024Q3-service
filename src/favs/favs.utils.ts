import { ARTISTS } from './../artist/artist.utils';
import { ALBUMS } from 'src/album/album.utils';
import { TRACKS } from 'src/track/track.utils';

export const FAVS = {
  artists: [] as string[],
  albums: [] as string[],
  tracks: [] as string[],
};

export const getAllFavs = () => {
  return {
    artists: FAVS.artists.map((id) =>
      ARTISTS.find((artist) => artist.id === id),
    ),
    albums: FAVS.albums.map((id) => ALBUMS.find((album) => album.id === id)),
    tracks: FAVS.tracks.map((id) => TRACKS.find((track) => track.id === id)),
  };
};

export const addTrackToFavs = (id: string) => {
  if (!FAVS.tracks.includes(id)) {
    FAVS.tracks.push(id);
    return {
      message: 'The track has been added to favorites',
      track: TRACKS.find((track) => track.id === id),
    };
  }
  return {
    message: 'The track is already in favorites',
    track: TRACKS.find((track) => track.id === id),
  };
};

export const deleteTrackFromFavs = (id: string) => {
  const index = FAVS.tracks.indexOf(id);
  if (index !== -1) {
    FAVS.tracks.splice(index, 1);
  }
};

export const findTrackInFavs = (id: string) => {
  return FAVS.tracks.find((trackId) => trackId === id);
};

export const addAlbumToFavs = (id: string) => {
  if (!FAVS.albums.includes(id)) {
    FAVS.albums.push(id);
    return {
      message: 'The album has been added to favorites',
      album: ALBUMS.find((album) => album.id === id),
    };
  }
  return {
    message: 'The album is already in favorites',
    album: ALBUMS.find((album) => album.id === id),
  };
};

export const deleteAlbumFromFavs = (id: string) => {
  const index = FAVS.albums.indexOf(id);
  if (index !== -1) {
    FAVS.albums.splice(index, 1);
  }
};

export const findAlbumInFavs = (id: string) => {
  return FAVS.albums.find((albumId) => albumId === id);
};

export const addArtistToFavs = (id: string) => {
  if (!FAVS.artists.includes(id)) {
    FAVS.artists.push(id);
    return {
      message: 'The artist has been added to favorites',
      artist: ARTISTS.find((artist) => artist.id === id),
    };
  }
  return {
    message: 'The artist is already in favorites',
    artist: ARTISTS.find((artist) => artist.id === id),
  };
};

export const deleteArtistFromFavs = (id: string) => {
  const index = FAVS.artists.indexOf(id);
  if (index !== -1) {
    FAVS.artists.splice(index, 1);
  }
};

export const findArtistInFavs = (id: string) => {
  return FAVS.artists.find((artistId) => artistId === id);
};

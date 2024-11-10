import { HttpException, Injectable } from '@nestjs/common';
import { Album, Artist, FavoritesResponse, Track } from 'src/types';
import {
  getAllFavs,
  addTrackToFavs,
  findTrackInFavs,
  deleteTrackFromFavs,
  findAlbumInFavs,
  addAlbumToFavs,
  deleteAlbumFromFavs,
  addArtistToFavs,
  findArtistInFavs,
  deleteArtistFromFavs,
} from './favs.utils';
import { findTrack } from 'src/track/track.utils';
import { validateId } from 'src/utils/helpers';
import { findAlbum } from 'src/album/album.utils';
import { findArtist } from 'src/artist/artist.utils';

@Injectable()
export class FavsService {
  public async getFavs(): Promise<FavoritesResponse> {
    const favs = getAllFavs();
    return new Promise((resolve) => {
      return resolve(favs);
    });
  }

  public async addTrack(
    id: string,
  ): Promise<{ message: string; track: Track }> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findTrack(id)) {
      throw new HttpException(`Track id ${id} does not exist`, 422);
    }
    return new Promise((resolve) => {
      return resolve(addTrackToFavs(id));
    });
  }

  public async deleteTrack(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findTrack(id)) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    if (!findTrackInFavs) {
      throw new HttpException(`Track id ${id} is not in favorites`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteTrackFromFavs(id));
    });
  }

  public async addAlbum(
    id: string,
  ): Promise<{ message: string; album: Album }> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findAlbum(id)) {
      throw new HttpException(`Album id ${id} does not exist`, 422);
    }
    return new Promise((resolve) => {
      return resolve(addAlbumToFavs(id));
    });
  }

  public async deleteAlbum(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findAlbum(id)) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    if (!findAlbumInFavs) {
      throw new HttpException(`Album id ${id} is not in favorites`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteAlbumFromFavs(id));
    });
  }

  public async addArtist(
    id: string,
  ): Promise<{ message: string; artist: Artist }> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findArtist(id)) {
      throw new HttpException(`Artist id ${id} does not exist`, 422);
    }
    return new Promise((resolve) => {
      return resolve(addArtistToFavs(id));
    });
  }

  public async deleteArtist(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!findArtist(id)) {
      throw new HttpException(`Artist id ${id} does not exist`, 404);
    }
    if (!findArtistInFavs) {
      throw new HttpException(`Artist id ${id} is not in favorites`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteArtistFromFavs(id));
    });
  }
}

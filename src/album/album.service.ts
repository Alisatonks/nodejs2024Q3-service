import { HttpException, Injectable } from '@nestjs/common';
import { Album } from 'src/types';
import { addAlbum, ALBUMS, deleteAlbum, updateAlb } from './album.utils';
import { findAlbum } from './album.utils';
import { validateId } from 'src/utils/helpers';
import { CreateAlbumDto } from './dto/createAlbum.dto';

@Injectable()
export class AlbumService {
  public async getAlbums(): Promise<Album[]> {
    const albums = ALBUMS;
    return albums;
  }
  public async getAlbumById(id: string): Promise<Album> {
    const album = findAlbum(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(album);
    });
  }

  public async postAlbum(album: CreateAlbumDto): Promise<Album> {
    return new Promise((resolve) => {
      return resolve(addAlbum(album));
    });
  }

  public async updateAlbum(
    id: string,
    albumData: CreateAlbumDto,
  ): Promise<Album> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const album = findAlbum(id);
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(updateAlb(id, albumData));
    });
  }

  public async deleteAlbum(id: string): Promise<void> {
    const album = findAlbum(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteAlbum(id));
    });
  }
}

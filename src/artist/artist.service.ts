import { HttpException, Injectable } from '@nestjs/common';
import { Artist } from 'src/types';
import {
  ARTISTS,
  findArtist,
  addArtist,
  updateArts,
  deleteArtist,
} from './artist.utils';
import { validateId } from 'src/utils/helpers';
import { CreateArtistDto } from './dto/createArtist.dto';

@Injectable()
export class ArtistService {
  public async getArtists(): Promise<Artist[]> {
    const artists = ARTISTS;
    return artists;
  }

  public async getArtistById(id: string): Promise<Artist> {
    const artist = findArtist(id) as Artist;
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!artist) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(artist);
    });
  }

  public async postArtist(artist: CreateArtistDto): Promise<Artist> {
    return new Promise((resolve) => {
      return resolve(addArtist(artist));
    });
  }

  public async updateArtist(
    id: string,
    artistsData: CreateArtistDto,
  ): Promise<Artist> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const artist = findArtist(id);
    if (!artist) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(updateArts(id, artistsData));
    });
  }

  public async deleteArtist(id: string): Promise<void> {
    const artist = findArtist(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!artist) {
      throw new HttpException(`User id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteArtist(id));
    });
  }
}

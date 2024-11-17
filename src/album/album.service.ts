import { HttpException, Injectable } from '@nestjs/common';
import { Album } from 'src/types';
import { addAlbum, ALBUMS, deleteAlbum, updateAlb } from './album.utils';
import { findAlbum } from './album.utils';
import { validateId } from 'src/utils/helpers';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomAlbum } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(CustomAlbum)
    private albumsRepository: Repository<CustomAlbum>,
  ) {}

  public async getAlbums(): Promise<Album[]> {
    const albums = await this.albumsRepository.find();
    return albums;
  }
  public async getAlbumById(id: string): Promise<Album> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    return album;
  }

  public async postAlbum(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create({
      ...album,
    });
    await this.albumsRepository.save(newAlbum);

    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    albumData: CreateAlbumDto,
  ): Promise<Album> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    album.name = albumData.name;
    album.year = albumData.year;
    album.artistId = albumData.artistId;

    await this.albumsRepository.save(album);

    return album;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(`Album id ${id} does not exist`, 404);
    }
    await this.albumsRepository.delete(id);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/types';
import { validateId } from 'src/utils/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomFavs } from './favs.entity';
import { Repository } from 'typeorm';
import { CustomArtist } from 'src/artist/artist.entity';
import { CustomAlbum } from 'src/album/album.entity';
import { CustomTrack } from 'src/track/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(CustomFavs)
    private favsRepository: Repository<CustomFavs>,
    @InjectRepository(CustomArtist)
    private artistsRepository: Repository<CustomArtist>,
    @InjectRepository(CustomAlbum)
    private albumsRepository: Repository<CustomAlbum>,
    @InjectRepository(CustomTrack)
    private tracksRepository: Repository<CustomTrack>,
  ) {
    // Инициализируем запись при создании сервиса
    this.initializeFavsRecord();
  }

  // Метод для начальной инициализации записи избранного
  private async initializeFavsRecord() {
    const favs = await this.favsRepository.findOne({
      where: { id: 1 },
    });

    if (!favs) {
      const newFavs = this.favsRepository.create({
        id: 1,
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favsRepository.save(newFavs);
    }
  }

  // Получение или создание записи избранного
  private async getFavsRecord() {
    const favs = await this.favsRepository.findOne({
      where: { id: 1 },
    });

    if (!favs) {
      const newFavs = await this.favsRepository.save({
        id: 1,
        artists: [],
        albums: [],
        tracks: [],
      });
      return newFavs;
    }

    return favs;
  }

  // Валидация ID
  private validateAndCheckId(id: string) {
    if (!validateId(id)) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
  }

  // Получение всех избранных элементов
  public async getFavs(): Promise<FavoritesResponse> {
    try {
      // Параллельное выполнение запросов для оптимизации
      const [favs, artists, albums, tracks] = await Promise.all([
        this.getFavsRecord(),
        this.artistsRepository.find(),
        this.albumsRepository.find(),
        this.tracksRepository.find(),
      ]);

      return {
        artists: favs.artists.map((id) =>
          artists.find((artist) => artist.id === id),
        ),
        albums: favs.albums.map((id) =>
          albums.find((album) => album.id === id),
        ),
        tracks: favs.tracks.map((id) =>
          tracks.find((track) => track.id === id),
        ),
      };
    } catch (error) {
      console.error('Ошибка в getFavs:', error);
      throw new HttpException('Внутренняя ошибка сервера', 500);
    }
  }

  // Общий метод для добавления в избранное
  private async addToFavorites<T extends 'tracks' | 'albums' | 'artists'>(
    id: string,
    type: T,
    repository: Repository<any>,
    entityName: string,
  ): Promise<{ message: string; [key: string]: any }> {
    this.validateAndCheckId(id);

    const [entity, favs] = await Promise.all([
      repository.findOne({ where: { id } }),
      this.getFavsRecord(),
    ]);

    if (!entity) {
      throw new HttpException(`${entityName} id ${id} не существует`, 422);
    }

    if (!favs[type].includes(id)) {
      favs[type].push(id);
      await this.favsRepository.save(favs);
      return {
        message: `${entityName} добавлен в избранное`,
        [entityName.toLowerCase()]: entity,
      };
    }

    return {
      message: `${entityName} уже в избранном`,
      [entityName.toLowerCase()]: entity,
    };
  }

  // Общий метод для удаления из избранного
  private async removeFromFavorites<T extends 'tracks' | 'albums' | 'artists'>(
    id: string,
    type: T,
    repository: Repository<any>,
    entityName: string,
  ): Promise<void> {
    this.validateAndCheckId(id);

    const [entity, favs] = await Promise.all([
      repository.findOne({ where: { id } }),
      this.getFavsRecord(),
    ]);

    if (!entity) {
      throw new HttpException(`${entityName} id ${id} не существует`, 404);
    }

    if (!favs[type].includes(id)) {
      throw new HttpException(
        `${entityName} id ${id} не найден в избранном`,
        404,
      );
    }

    favs[type] = favs[type].filter((itemId) => itemId !== id);
    await this.favsRepository.save(favs);
  }

  // Методы для работы с треками
  public async addTrack(id: string) {
    return this.addToFavorites(id, 'tracks', this.tracksRepository, 'Track');
  }

  public async deleteTrack(id: string) {
    return this.removeFromFavorites(
      id,
      'tracks',
      this.tracksRepository,
      'Track',
    );
  }

  // Методы для работы с альбомами
  public async addAlbum(id: string) {
    return this.addToFavorites(id, 'albums', this.albumsRepository, 'Album');
  }

  public async deleteAlbum(id: string) {
    return this.removeFromFavorites(
      id,
      'albums',
      this.albumsRepository,
      'Album',
    );
  }

  // Методы для работы с артистами
  public async addArtist(id: string) {
    return this.addToFavorites(id, 'artists', this.artistsRepository, 'Artist');
  }

  public async deleteArtist(id: string) {
    return this.removeFromFavorites(
      id,
      'artists',
      this.artistsRepository,
      'Artist',
    );
  }
}

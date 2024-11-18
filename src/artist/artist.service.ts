import { HttpException, Injectable } from '@nestjs/common';
import { Artist } from 'src/types';
import { validateId } from 'src/utils/helpers';
import { CreateArtistDto } from './dto/createArtist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomArtist } from './artist.entity';
import { CustomFavs } from 'src/favs/favs.entity';
import { CustomTrack } from 'src/track/track.entity';
import { CustomAlbum } from 'src/album/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(CustomArtist)
    private artistsRepository: Repository<CustomArtist>,

    @InjectRepository(CustomFavs)
    private favsRepository: Repository<CustomFavs>,

    @InjectRepository(CustomTrack)
    private tracksRepository: Repository<CustomTrack>,

    @InjectRepository(CustomAlbum)
    private albumsRepository: Repository<CustomAlbum>,
  ) {}

  public async getArtists(): Promise<Artist[]> {
    const artists = await this.artistsRepository.find();
    return artists;
  }

  public async getArtistById(id: string): Promise<Artist> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(`Artist id ${id} does not exist`, 404);
    }
    return artist;
  }

  public async postArtist(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create({
      ...artist,
    });
    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  public async updateArtist(
    id: string,
    artistsData: CreateArtistDto,
  ): Promise<Artist> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(`Artist id ${id} does not exist`, 404);
    }
    artist.name = artistsData.name;
    artist.grammy = artistsData.grammy;

    await this.artistsRepository.save(artist);

    return artist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(`Artist id ${id} does not exist`, 404);
    }
    await this.artistsRepository.delete(id);
    const favs = await this.favsRepository.findOne({
      where: { id: 1 },
    });

    await this.tracksRepository.update({ artistId: id }, { artistId: null });
    await this.albumsRepository.update({ artistId: id }, { artistId: null });

    if (favs) {
      favs.artists = favs.artists.filter((artistId) => artistId !== id);
      await this.favsRepository.save(favs);
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from 'src/types';
import { validateId } from 'src/utils/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomTrack } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(CustomTrack)
    private tracksRepository: Repository<CustomTrack>,
  ) {}

  public async getTracks(): Promise<Track[]> {
    const tracks = await this.tracksRepository.find();
    return tracks;
  }

  public async getTrackById(id: string): Promise<Track> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    return track;
  }

  public async postTrack(track: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracksRepository.create({
      ...track,
    });
    await this.tracksRepository.save(newTrack);

    return newTrack;
  }

  public async updateTrack(
    id: string,
    trackData: CreateTrackDto,
  ): Promise<Track> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    track.name = trackData.name;
    track.duration = trackData.duration;
    track.artistId = trackData.artistId;
    track.albumId = trackData.albumId;

    await this.tracksRepository.save(track);

    return track;
  }

  public async deleteTrack(id: string): Promise<void> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    await this.tracksRepository.delete(id);
  }
}

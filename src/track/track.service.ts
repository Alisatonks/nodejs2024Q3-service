import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from 'src/types';
import {
  addTrack,
  deleteTrack,
  findTrack,
  TRACKS,
  updateTrack,
} from './track.utils';
import { validateId } from 'src/utils/helpers';

@Injectable()
export class TrackService {
  public async getTracks(): Promise<Track[]> {
    const tracks = TRACKS;
    return tracks;
  }

  public async getTrackById(id: string): Promise<Track> {
    const track = findTrack(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(track);
    });
  }

  public async postTrack(track: CreateTrackDto): Promise<Track> {
    return new Promise((resolve) => {
      return resolve(addTrack(track));
    });
  }

  public async updateTrack(
    id: string,
    trackData: CreateTrackDto,
  ): Promise<Track> {
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    const track = findTrack(id);
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(updateTrack(id, trackData));
    });
  }

  public async deleteTrack(id: string): Promise<void> {
    const track = findTrack(id);
    const validId = validateId(id);
    if (!validId) {
      throw new HttpException(`Id ${id} is not valid`, 400);
    }
    if (!track) {
      throw new HttpException(`Track id ${id} does not exist`, 404);
    }
    return new Promise((resolve) => {
      return resolve(deleteTrack(id));
    });
  }
}

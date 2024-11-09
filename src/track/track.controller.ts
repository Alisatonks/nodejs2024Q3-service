import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getArtists() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  async postArtist(@Body() track: CreateTrackDto) {
    return this.trackService.postTrack(track);
  }

  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() newData: CreateTrackDto) {
    return this.trackService.updateTrack(id, newData);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}

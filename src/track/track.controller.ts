import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getArtists() {
    return this.trackService.getTracks();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async postArtist(@Body() track: CreateTrackDto) {
    return this.trackService.postTrack(track);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() newData: CreateTrackDto) {
    return this.trackService.updateTrack(id, newData);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}

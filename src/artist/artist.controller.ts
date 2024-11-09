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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async postArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.postArtist(artist);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() newData: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, newData);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}

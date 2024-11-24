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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getArtists() {
    return this.artistService.getArtists();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async postArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.postArtist(artist);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() newData: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, newData);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}

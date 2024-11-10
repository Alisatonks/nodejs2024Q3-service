import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getFavorites() {
    return this.favsService.getFavs();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}

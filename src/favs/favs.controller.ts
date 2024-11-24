import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getFavorites() {
    return this.favsService.getFavs();
  }

  @UseGuards(JwtGuard)
  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @UseGuards(JwtGuard)
  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @UseGuards(JwtGuard)
  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @UseGuards(JwtGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @UseGuards(JwtGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @UseGuards(JwtGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}

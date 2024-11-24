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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  async postArtist(@Body() artist: CreateAlbumDto) {
    return this.albumService.postAlbum(artist);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() newData: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, newData);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}

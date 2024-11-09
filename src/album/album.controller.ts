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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async postArtist(@Body() artist: CreateAlbumDto) {
    return this.albumService.postAlbum(artist);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() newData: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, newData);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}

import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomAlbum } from './album.entity';
import { CustomFavs } from 'src/favs/favs.entity';
import { CustomTrack } from 'src/track/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomAlbum, CustomFavs, CustomTrack])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}

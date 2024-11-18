import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomArtist } from './artist.entity';
import { CustomFavs } from 'src/favs/favs.entity';
import { CustomTrack } from 'src/track/track.entity';
import { CustomAlbum } from 'src/album/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomArtist,
      CustomFavs,
      CustomTrack,
      CustomAlbum,
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}

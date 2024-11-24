import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomFavs } from './favs.entity';
import { CustomAlbum } from 'src/album/album.entity';
import { CustomArtist } from 'src/artist/artist.entity';
import { CustomTrack } from 'src/track/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomFavs,
      CustomAlbum,
      CustomArtist,
      CustomTrack,
    ]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}

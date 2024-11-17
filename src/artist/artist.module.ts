import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomArtist } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomArtist])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}

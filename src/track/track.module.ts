import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTrack } from './track.entity';
import { CustomFavs } from 'src/favs/favs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomTrack, CustomFavs])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}

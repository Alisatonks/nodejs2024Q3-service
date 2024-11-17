import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTrack } from './track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomTrack])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}

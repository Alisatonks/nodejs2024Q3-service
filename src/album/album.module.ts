import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomAlbum } from './album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomAlbum])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}

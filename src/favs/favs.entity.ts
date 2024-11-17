import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  @Column()
  artistId: string | null;
}

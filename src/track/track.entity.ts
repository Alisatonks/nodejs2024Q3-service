import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string | null;
}

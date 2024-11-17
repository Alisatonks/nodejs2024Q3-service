import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomFavs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { default: [] })
  artists: string[];

  @Column('simple-array', { default: [] })
  albums: string[];

  @Column('simple-array', { default: [] })
  tracks: string[];
}

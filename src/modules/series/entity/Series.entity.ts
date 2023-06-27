import { Seasons } from 'src/modules/seasons/entity/season.entity';
import { Genre } from '../../genre/entity/Genre.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  trailer: string;

  @OneToMany(() => Seasons, (season) => season.series_id)
  seasons: Seasons[];

  @ManyToOne(() => Genre, (genre) => genre.series)
  genre_id: Genre;
}

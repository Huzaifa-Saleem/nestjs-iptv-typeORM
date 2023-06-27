import { Seasons } from 'src/modules/seasons/entity/season.entity';
import { Series } from 'src/modules/series/entity/Series.entity';
import { Streams } from 'src/modules/streams/entity/streams.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Seasons, (seasons) => seasons.episodes)
  season_id: Seasons;

  @OneToMany(() => Streams, (stream) => stream.episode_id)
  streams: Streams;
}

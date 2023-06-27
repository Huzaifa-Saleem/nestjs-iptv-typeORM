import { Episodes } from 'src/modules/episodes/entity/episodes.entity';
import { Series } from 'src/modules/series/entity/Series.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seasons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Episodes, (episodes) => episodes.season_id)
  episodes: Episodes[];

  @ManyToOne(() => Series, (series) => series.seasons)
  series_id: Series;
}

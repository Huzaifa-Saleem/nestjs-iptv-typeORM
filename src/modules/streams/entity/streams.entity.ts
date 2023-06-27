import { Episodes } from 'src/modules/episodes/entity/episodes.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Streams {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.streams)
  user_id: User;

  @ManyToOne(() => Episodes, (episodes) => episodes.streams)
  episode_id: Episodes;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // created_at: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // updated_at: Date;
}

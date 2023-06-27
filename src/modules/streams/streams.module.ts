import { Module } from '@nestjs/common';
import { StreamsController } from './controller/streams.controller';
import { StreamsService } from './services/streams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streams } from './entity/streams.entity';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/services/users.service';
import { EpisodesService } from '../episodes/services/episodes.service';
import { Episodes } from '../episodes/entity/episodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Streams, User, Episodes])],
  controllers: [StreamsController],
  providers: [StreamsService, UsersService, EpisodesService],
})
export class StreamsModule {}

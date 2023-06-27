import { Module } from '@nestjs/common';
import { SeasonsController } from './controllers/seasons.controller';
import { SeasonsService } from './services/seasons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seasons } from './entity/season.entity';
import { Series } from '../series/entity/Series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seasons, Series])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}

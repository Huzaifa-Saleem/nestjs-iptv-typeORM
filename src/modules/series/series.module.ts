import { Module } from '@nestjs/common';
import { SeriesController } from './controllers/series.controller';
import { SeriesService } from './services/series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './entity/Series.entity';
import { Genre } from '../genre/entity/Genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Series, Genre])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}

import { Module } from '@nestjs/common';
import { GenreController } from './controllers/genre.controller';
import { GenreService } from './services/genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entity/Genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../entity/Genre.entity';
import { Repository } from 'typeorm';
import { genreDTO } from '../dto/genre.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { GENRE_CONSTANTS } from 'src/constants/genre.constants';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async getGneres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async getSingleGnere(id: number): Promise<Genre> {
    try {
      const genre = await this.genreRepository.findOne({ where: { id: id } });

      if (!genre) throw new Error(`genre not found`);

      return genre;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createGenre(genredto: genreDTO) {
    try {
      const genre = await this.genreRepository.save(genredto);

      return genre;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateGenre(id: number, genredto: genreDTO) {
    const genre = await this.genreRepository.findOne({ where: { id: id } });
    if (!genre) throw new ForbiddenException(GENRE_CONSTANTS.NOT_FOUND);

    await this.genreRepository.update(id, genredto);

    return { message: GENRE_CONSTANTS.UPDATED };
  }

  async deleteGenre(id: number) {
    const genre = await this.genreRepository.findOne({ where: { id: id } });
    if (!genre) throw new ForbiddenException(GENRE_CONSTANTS.NOT_FOUND);

    await this.genreRepository.delete(id);

    return { message: GENRE_CONSTANTS.DELETED };
  }
}

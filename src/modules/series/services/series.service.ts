import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from '../entity/Series.entity';
import { SeriesDTO } from '../dto/Series.dto';
import { Genre } from 'src/modules/genre/entity/Genre.entity';
import { UpdateSeriesDTO } from '../dto/updateSeries.dto';
import { SERIES_CONSTANTS } from 'src/constants/series.constants';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  /** GET ALL SERIES*/
  async getAllSeries() {
    return await this.seriesRepository.find({ relations: { genre_id: true } });
  }

  /** GET A SINGLE SERIES */
  async getSingleSeries(id: number) {
    try {
      const series = await this.seriesRepository.findOne({ where: { id: id } });
      if (!series)
        throw new HttpException('Series not found...', HttpStatus.BAD_REQUEST);

      return series;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** CREATE SERIES */
  async createSeries(seriesDTO: SeriesDTO) {
    try {
      return await this.seriesRepository.save(seriesDTO);
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  /** UPDATE SERIES  */
  async updateSeries(id: number, seriesDTO: UpdateSeriesDTO) {
    try {
      const series = await this.seriesRepository.findOne({ where: { id: id } });
      if (!series)
        throw new HttpException('Series not found...', HttpStatus.BAD_REQUEST);

      await this.seriesRepository.update({ id: id }, seriesDTO);

      return { message: SERIES_CONSTANTS.UPDATED };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE SERIES */
  async deleteSeries(id: number) {
    try {
      const series = await this.seriesRepository.findOne({ where: { id: id } });
      if (!series)
        throw new HttpException('Series not found...', HttpStatus.BAD_REQUEST);

      await this.seriesRepository.delete({ id: id });

      return { message: SERIES_CONSTANTS.DELETED };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

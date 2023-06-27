import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SeriesService } from '../services/series.service';
import { ApiTags } from '@nestjs/swagger';
import { SeriesDTO } from '../dto/Series.dto';
import { UpdateSeriesDTO } from '../dto/updateSeries.dto';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';
import { SERIES_CONSTANTS } from 'src/constants/series.constants';
import { Series } from '../entity/Series.entity';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private SeriesService: SeriesService) {}

  /** GET ALL SERIES */
  @Get()
  async getSeries(): Promise<SeriesDTO[]> {
    try {
      return await this.SeriesService.getAllSeries();
    } catch (error) {
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** GET SINGLE SERIES */
  @Get('/:id')
  async getSingleSerie(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SeriesDTO> {
    try {
      return await this.SeriesService.getSingleSeries(id);
    } catch (error) {
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** CREATE A SERIES */
  @Post()
  async postSeries(@Body() seriesDto: SeriesDTO): Promise<SeriesDTO> {
    try {
      return await this.SeriesService.createSeries(seriesDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(SERIES_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** UPDATE A SERIES */
  @Patch('/:id')
  async updateSeries(
    @Param('id', ParseIntPipe) id: number,
    @Body() seriesDto: UpdateSeriesDTO,
  ): Promise<{ message: string }> {
    try {
      return await this.SeriesService.updateSeries(id, seriesDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(SERIES_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      if (error.message.includes(ERROR_CONSTANTS.FORIEGN_KEY_NOT_FOUND)) {
        throw new HttpException(
          SERIES_CONSTANTS.GENRE_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE A SERIES */
  @Delete('/:id')
  async deleteSeries(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.SeriesService.deleteSeries(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

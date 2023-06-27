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
import { SeasonsService } from '../services/seasons.service';
import { ApiTags } from '@nestjs/swagger';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';
import { SEASONS_CONSTANTS } from 'src/constants/season.constants';
import { SeasonDTO, UpdateSeasonsDTO } from '../dto/season.dto';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private seasonServices: SeasonsService) {}

  /** GET ALL SEASONS */
  @Get()
  async getSeasons(): Promise<SeasonDTO[]> {
    try {
      return await this.seasonServices.getAllSeasons();
    } catch (error) {
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** GET SINGLE SEASONS */
  @Get('/:id')
  async getSingleSerie(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.seasonServices.getSingleSeasons(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** CREATE A SEASONS */
  @Post()
  async postSeasons(@Body() seasonDto: SeasonDTO) {
    try {
      return await this.seasonServices.createSeasons(seasonDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(SEASONS_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** UPDATE A SEASONS */
  @Patch('/:id')
  async updateSeasons(
    @Param('id', ParseIntPipe) id: number,
    @Body() seasonDto: UpdateSeasonsDTO,
  ) {
    try {
      return await this.seasonServices.updateSeasons(id, seasonDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(SEASONS_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }

      if (error.message.includes(ERROR_CONSTANTS.FORIEGN_KEY_NOT_FOUND)) {
        throw new HttpException(
          SEASONS_CONSTANTS.SERIES_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE A SEASONS */
  @Delete('/:id')
  async deleteSeasons(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.seasonServices.deleteSeasons(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

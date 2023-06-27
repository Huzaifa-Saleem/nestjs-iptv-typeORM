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
import { GenreService } from '../services/genre.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { genreDTO } from '../dto/genre.dto';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';
import { GENRE_CONSTANTS } from 'src/constants/genre.constants';

@ApiTags('Genre')
@Controller('genres')
export class GenreController {
  constructor(private genreServices: GenreService) {}

  @Get()
  async getAllGenre() {
    try {
      return await this.genreServices.getGneres();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({ name: 'id', example: 1 })
  @Get('/:id')
  async getSignleGenre(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.genreServices.getSingleGnere(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async postGenre(@Body() genredto: genreDTO) {
    try {
      const genre = await this.genreServices.createGenre(genredto);
      return genre;
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(GENRE_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('/:id')
  async updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() genredto: genreDTO,
  ) {
    try {
      const genre = await this.genreServices.updateGenre(id, genredto);
      return genre;
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(GENRE_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiParam({ name: 'id', example: 1 })
  @Delete('/:id')
  async deleteGenre(@Param('id', ParseIntPipe) id: number) {
    try {
      const genre = await this.genreServices.deleteGenre(id);
      return genre;
    } catch (error) {
      throw new HttpException(GENRE_CONSTANTS.NOT_FOUND, HttpStatus.CONFLICT);
    }
  }
}

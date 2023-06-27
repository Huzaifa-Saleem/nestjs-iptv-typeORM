import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EpisodesService } from '../services/episodes.service';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';
import { EPISODES_CONSTANTS } from 'src/constants/episode.constants';
import { EpisodeDTO, UpdateEpisodeDTO } from '../dto/episode.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private episodeServives: EpisodesService) {}

  /** GET ALL EPISODES */
  @Get()
  async getEpisodes() {
    try {
      return await this.episodeServives.getAllEpisodes();
    } catch (error) {
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** GET SINGLE EPISODES */
  @Get('/:id')
  async getSingleSerie(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.episodeServives.getSingleEpisodes(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** CREATE A EPISODES */
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async postEpisodes(
    @Body() episodeDTO: EpisodeDTO,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      return await this.episodeServives.createEpisodes(episodeDTO, file);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(EPISODES_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** UPDATE A EPISODES */
  @Patch('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateEpisodes(
    @Param('id', ParseIntPipe) id: number,
    @Body() episodeDto: UpdateEpisodeDTO,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      return await this.episodeServives.updateEpisodes(id, episodeDto, file);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(EPISODES_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }

      if (error.message.includes(ERROR_CONSTANTS.FORIEGN_KEY_NOT_FOUND)) {
        throw new HttpException(
          EPISODES_CONSTANTS.SEASON_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE A EPISODES */
  @Delete('/:id')
  async deleteEpisodes(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.episodeServives.deleteEpisodes(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

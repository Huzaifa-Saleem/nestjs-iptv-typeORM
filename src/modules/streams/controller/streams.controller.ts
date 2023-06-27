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
import { StreamsService } from '../services/streams.service';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';
import { STREAMS_CONSTANTS } from 'src/constants/stream.constants';
import { StreamDTO, UpdateStreamsDTO } from '../dto/streams.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Streams')
@Controller('streams')
export class StreamsController {
  constructor(private streamServices: StreamsService) {}

  /** GET ALL STREAMS */
  @Get()
  async getStreams() {
    try {
      return await this.streamServices.getAllStreams();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** GET SINGLE STREAMS */
  @Get('/:id')
  async getSingleSerie(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.streamServices.getSingleStreams(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** CREATE A STREAMS */
  @Post()
  async postStreams(@Body() streamDto: StreamDTO) {
    try {
      return await this.streamServices.createStreams(streamDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(STREAMS_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      if (error.status === 403) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** UPDATE A STREAMS */
  @Patch('/:id')
  async updateStreams(
    @Param('id', ParseIntPipe) id: number,
    @Body() streamDto: UpdateStreamsDTO,
  ) {
    try {
      return await this.streamServices.updateStreams(id, streamDto);
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(STREAMS_CONSTANTS.EXIST, HttpStatus.CONFLICT);
      }
      if (error.message.includes(ERROR_CONSTANTS.FORIEGN_KEY_NOT_FOUND)) {
        throw new HttpException(
          // STREAMS_CONSTANTS.NOT_FOUND,
          error.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE A STREAMS */
  @Delete('/:id')
  async deleteStreams(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.streamServices.deleteStreams(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Streams } from '../entity/streams.entity';
import { Repository } from 'typeorm';
import { StreamDTO, UpdateStreamsDTO } from '../dto/streams.dto';
import { User } from 'src/modules/users/entity/user.entity';
import { Episodes } from 'src/modules/episodes/entity/episodes.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { EpisodesService } from 'src/modules/episodes/services/episodes.service';
import { STREAMS_CONSTANTS } from 'src/constants/stream.constants';

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(Streams)
    private streamRepository: Repository<Streams>,
    private userService: UsersService,
    private episodeService: EpisodesService,
  ) {}

  /** GET ALL STREAMS*/
  async getAllStreams() {
    return await this.streamRepository.find({
      relations: { episode_id: true, user_id: true },
    });
  }

  /** GET A SINGLE STREAMS */
  async getSingleStreams(id: number) {
    try {
      const stream = await this.streamRepository.findOne({ where: { id: id } });
      if (!stream)
        throw new HttpException('Streams not found...', HttpStatus.BAD_REQUEST);

      return stream;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** CREATE STREAMS */
  async createStreams(streamDto: StreamDTO) {
    // User_ID
    const user = await this.userService.getUserById(Number(streamDto.user_id));
    if (!user)
      throw new HttpException('User not found...', HttpStatus.NOT_FOUND);

    // EPISODE_ID
    const episode = await this.episodeService.getSingleEpisodes(
      Number(streamDto.episode_id),
    );
    if (!episode)
      throw new HttpException('Episode not found...', HttpStatus.NOT_FOUND);

    return await this.streamRepository.save(streamDto);
  }

  /** UPDATE STREAMS  */
  async updateStreams(id: number, streamDto: UpdateStreamsDTO) {
    try {
      // CHECK STREAM
      const stream = await this.streamRepository.findOne({ where: { id: id } });
      if (!stream)
        throw new HttpException('Streams not found...', HttpStatus.BAD_REQUEST);

      // CHECK USER
      const user = await this.userService.getUserById(
        Number(streamDto.user_id),
      );
      if (!user)
        throw new HttpException('User not found...', HttpStatus.NOT_FOUND);

      // CHECK EPISODE
      const episode = await this.episodeService.getSingleEpisodes(
        Number(streamDto.episode_id),
      );
      if (!episode)
        throw new HttpException('Episode not found...', HttpStatus.NOT_FOUND);

      const updatedStream = await this.streamRepository.save({
        ...stream,
        ...streamDto,
      });

      return { message: STREAMS_CONSTANTS.UPDATED, data: updatedStream };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE STREAMS */
  async deleteStreams(id: number) {
    try {
      const stream = await this.streamRepository.findOne({ where: { id: id } });
      if (!stream)
        throw new HttpException('Streams not found...', HttpStatus.BAD_REQUEST);

      await this.streamRepository.delete({ id: id });

      return { message: STREAMS_CONSTANTS.DELETED };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

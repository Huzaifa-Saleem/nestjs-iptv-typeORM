import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodes } from '../entity/episodes.entity';
import { Repository } from 'typeorm';
import { EpisodeDTO, UpdateEpisodeDTO } from '../dto/episode.dto';
import { EPISODES_CONSTANTS } from 'src/constants/episode.constants';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
  ) {}

  /** GET ALL EPISODES */
  async getAllEpisodes() {
    return await this.episodesRepository.find();
  }

  /** GET SINGLE EPISODE */
  async getSingleEpisodes(id) {
    try {
      const season = await this.episodesRepository.findOne({
        where: { id: id },
      });
      if (!season)
        throw new HttpException(
          EPISODES_CONSTANTS.NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );

      return season;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** CREATE EPISODES */
  async createEpisodes(episodeDTO: EpisodeDTO, file: Express.Multer.File) {
    try {
      const data = {
        name: episodeDTO.name,
        description: episodeDTO.description,
        season_id: episodeDTO.season_id,
        image: `http://localhost:5000/upload/${file.filename}`,
      };

      const episode = await this.episodesRepository.save(data);
      return episode;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** UPDATE EPISODES */
  async updateEpisodes(
    id: number,
    episodeDTO: UpdateEpisodeDTO,
    file: Express.Multer.File,
  ) {
    try {
      const data = {
        name: episodeDTO?.name,
        description: episodeDTO?.description,
        season_id: episodeDTO?.season_id,
        image: file && `http://localhost:5000/upload/${file.filename}`,
      };
      const episode = await this.episodesRepository.update({ id }, data);

      return EPISODES_CONSTANTS.UPDATED;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE EPISODES */
  async deleteEpisodes(id: number) {
    try {
      const episode = await this.episodesRepository.findOne({
        where: { id: id },
      });
      if (!episode)
        throw new HttpException(
          EPISODES_CONSTANTS.NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );

      await this.episodesRepository.delete({ id: id });

      return { message: EPISODES_CONSTANTS.DELETED };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

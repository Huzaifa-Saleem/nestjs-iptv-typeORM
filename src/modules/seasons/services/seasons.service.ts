import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SEASONS_CONSTANTS } from 'src/constants/season.constants';
import { Repository } from 'typeorm';
import { SeasonDTO, UpdateSeasonsDTO } from '../dto/season.dto';
import { Seasons } from '../entity/season.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Seasons)
    private seasonRepository: Repository<Seasons>,
  ) {}
  /** GET ALL SEASONS*/
  async getAllSeasons() {
    return await this.seasonRepository.find({ relations: { series_id: true } });
  }

  /** GET A SINGLE SEASONS */
  async getSingleSeasons(id: number) {
    try {
      const season = await this.seasonRepository.findOne({ where: { id: id } });
      if (!season)
        throw new HttpException('Seasons not found...', HttpStatus.BAD_REQUEST);

      return season;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /** CREATE SEASONS */
  async createSeasons(SeasonDto: SeasonDTO) {
    try {
      return await this.seasonRepository.save(SeasonDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  /** UPDATE SEASONS  */
  async updateSeasons(id: number, SeasonDto: UpdateSeasonsDTO) {
    try {
      const season = await this.seasonRepository.findOne({ where: { id: id } });
      if (!season)
        throw new HttpException('Seasons not found...', HttpStatus.BAD_REQUEST);

      await this.seasonRepository.update({ id: id }, SeasonDto);

      return { message: SEASONS_CONSTANTS.UPDATED };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /** DELETE SEASONS */
  async deleteSeasons(id: number) {
    try {
      const season = await this.seasonRepository.findOne({ where: { id: id } });
      if (!season)
        throw new HttpException('Seasons not found...', HttpStatus.BAD_REQUEST);

      await this.seasonRepository.delete({ id: id });

      return { message: SEASONS_CONSTANTS.DELETED };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

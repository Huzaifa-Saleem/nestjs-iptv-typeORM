import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Seasons } from 'src/modules/seasons/entity/season.entity';
import { Series } from 'src/modules/series/entity/Series.entity';

export class EpisodeDTO {
  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsNotEmpty()
  season_id: Seasons;

  @ApiProperty({
    description: '',
    example: 'batman',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '',
    example: 'batman returns',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: '',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image: string;
}
export class UpdateEpisodeDTO {
  @ApiProperty({
    description: '',
    example: '1',
    required: false,
  })
  @IsOptional()
  season_id: Seasons;

  @ApiProperty({
    description: '',
    example: 'batman',
    required: false,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: '',
    example: 'batman returns',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: '',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image: string;
}

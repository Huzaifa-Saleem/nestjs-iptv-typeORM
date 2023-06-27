import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Series } from 'src/modules/series/entity/Series.entity';

export class SeasonDTO {
  id: number;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsNotEmpty()
  series_id: Series;

  @ApiProperty({
    description: '',
    example: 'batman',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '',
    example: 'batman returns ',
  })
  @IsNotEmpty()
  description: string;
}

export class UpdateSeasonsDTO {
  id: number;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsOptional()
  series_id: Series;

  @ApiProperty({
    description: '',
    example: 'batman',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: '',
    example: 'batman returns ',
  })
  @IsOptional()
  description: string;
}

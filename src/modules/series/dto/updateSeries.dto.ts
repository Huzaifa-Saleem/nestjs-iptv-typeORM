import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Genre } from 'src/modules/genre/entity/Genre.entity';

export class UpdateSeriesDTO {
  @IsOptional()
  @ApiProperty({
    description: '',
    example: '1',
  })
  genre_id: Genre;
  @IsOptional()
  @ApiProperty({
    description: '',
    example: 'batman',
  })
  name: string;
  @IsOptional()
  @ApiProperty({
    description: '',
    example: 'batman returns ',
  })
  description: string;
  @IsOptional()
  @ApiProperty({
    description: '',
    example: 'https://batman.com/trailer',
  })
  trailer: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { Genre } from 'src/modules/genre/entity/Genre.entity';

export class SeriesDTO {
  id: number;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsNotEmpty()
  genre_id: Genre;

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

  @ApiProperty({
    description: '',
    example: 'https://batman.com/trailer',
  })
  @IsNotEmpty()
  trailer: string;
}

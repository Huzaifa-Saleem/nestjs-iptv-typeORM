import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class genreDTO {
  @ApiProperty({
    description: 'The name of the Genre',
    example: 'action',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

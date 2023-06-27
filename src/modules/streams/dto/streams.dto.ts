import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Episodes } from 'src/modules/episodes/entity/episodes.entity';
import { Seasons } from 'src/modules/seasons/entity/season.entity';
import { User } from 'src/modules/users/entity/user.entity';

export class StreamDTO {
  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsNotEmpty()
  user_id: User;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsNotEmpty()
  episode_id: Episodes;
}
export class UpdateStreamsDTO {
  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsOptional()
  user_id: User;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsOptional()
  episode_id: Episodes;
}

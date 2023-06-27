import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'last name of the user',
    example: 'doe',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'email of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '12345678',
  })
  @IsNotEmpty()
  password: string;
}

export class LoginDTO {
  @ApiProperty({
    description: 'email of the user',
    example: 'John@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: '12345678',
  })
  @IsNotEmpty()
  password: string;
}

export class UpdateDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsOptional()
  firstname: string;

  @ApiProperty({
    description: 'last name of the user',
    example: 'doe',
  })
  @IsOptional()
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;
}

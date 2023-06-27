import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDTO, UserDTO } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { USER_CONSTANTS } from 'src/constants/user.constants';
import { ERROR_CONSTANTS } from 'src/constants/error.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDTO: UserDTO) {
    try {
      const user = await this.authService.register(userDTO);
      return user;
    } catch (error) {
      if (error.message.includes(ERROR_CONSTANTS.DUPLICATE_ERROR)) {
        throw new HttpException(
          USER_CONSTANTS.EMAIL_EXIST,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        ERROR_CONSTANTS.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(AuthGuard)
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      return await this.authService.login(loginDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
      // throw new Error(error);
    }
  }
}

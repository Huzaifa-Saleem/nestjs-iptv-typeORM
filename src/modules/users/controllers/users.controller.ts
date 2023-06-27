import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateDto } from '../dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({ name: 'id', example: 1 })
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateDto,
  ) {
    try {
      return await this.userService.updateUser(id, updateUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({ name: 'id', example: 1 })
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

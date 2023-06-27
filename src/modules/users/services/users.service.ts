import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateDto } from '../dto/user.dto';
import { USER_CONSTANTS } from 'src/constants/user.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //get all users
  async getUsers() {
    return await this.usersRepository.find();
  }

  //get single user by id
  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) throw new ForbiddenException(USER_CONSTANTS.NOT_FOUND);

    return user;
  }

  //update user by id
  async updateUser(id: number, updateBody: UpdateDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) throw new ForbiddenException(USER_CONSTANTS.NOT_FOUND);

    await this.usersRepository.update(id, updateBody);

    return { message: USER_CONSTANTS.UPDATED };
  }

  //delete user by id
  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) throw new ForbiddenException(USER_CONSTANTS.NOT_FOUND);

    await this.usersRepository.delete(id);

    return {
      message: USER_CONSTANTS.DELETED,
    };
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, UserDTO } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { USER_CONSTANTS } from 'src/constants/user.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userdto: UserDTO) {
    const user = await this.userRepository.save(userdto);
    return user;
  }

  async login(userdto: LoginDTO) {
    const user = await this.userRepository.findOne({
      where: { email: userdto.email },
    });

    if (!user) throw new ForbiddenException(USER_CONSTANTS.NOT_FOUND);

    if (user.password !== userdto.password)
      throw new ForbiddenException(USER_CONSTANTS.INCORRECT_PASSWORD);

    const payload = {
      id: 'adad',
      email: user.email,
      name: `${user.firstname}  ${user.lastname}`,
    };

    delete user.password;
    const accessToken = await this.jwtService.sign(payload);

    return { user, access_token: accessToken };
  }
}

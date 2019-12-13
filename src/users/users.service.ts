import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Role, User } from '../entities/users.entity';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) private readonly repository: UsersRepository) {
  }

  async loadUserByUsername(username: string): Promise<User> {
    return this.repository.findByUsername(username);
  }

  async registerCustomerUser(username: string, password: string) {
    const foundUser = await this.repository.findByUsername(username);

    if (foundUser) {
      throw new UserAlreadyExistException('User already exist');
    }

    const user = new User();
    user.username = username;
    user.password = password;
    user.roles = [Role.CUSTOMER];

    return this.repository.save(user);
  }
}

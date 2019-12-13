import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  async findByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }
}

import { Author } from '../entities/authors.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Author)
export class AuthorsRepository extends Repository<Author> {

  async findById(id: number): Promise<Author> {
    return this.findOne(id);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.delete({id});
    return result.affected === 1;
  }

  async findAll(): Promise<Author[]> {
    return this.find();
  }
}

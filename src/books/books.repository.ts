import { Book } from '../entities/books.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {

  async findAll(): Promise<Book[]> {
    return this.find({relations: ['authors']});
  }

  async findById(id: number): Promise<Book> {
    return this.findOne(id, {relations: ['authors']});
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.delete({id});
    return result.affected === 1;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../entities/books.entity';
import { BooksRepository } from './books.repository';
import { BookCreationForm } from './forms/book-creation-form';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBookForm } from './forms/book-update-form';
import { Author } from '../entities/authors.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(BooksRepository) private readonly repository: BooksRepository) {
  }

  async listAll(): Promise<Book[]> {
    return this.repository.findAll();
  }

  async showBy(id: number): Promise<Book> {
    const author = await this.repository.findById(id);

    if (!author) {
      throw new NotFoundException(`Cannot find book with id ${id}`);
    }

    return author;
  }

  async register(form: BookCreationForm): Promise<number> {
    const { title, releaseDate, category, authorIds } = form;
    const book = new Book();

    book.title = title;
    book.releaseDate = releaseDate;
    book.category = category;
    book.authors = authorIds.map(BooksService.mappingAuthorBy);

    await this.repository.save(book);

    return book.id;
  }

  private static mappingAuthorBy(id: number): Author {
    const author = new Author();
    author.id = id;

    return author;
  }

  async removeById(id: number): Promise<void> {
    const wasDeleted = await this.repository.deleteById(id);

    if (!wasDeleted) {
      throw new NotFoundException(`Cannot find book with '${id}' as id`);
    }
  }

  async updateBookFrom(id: number, form: UpdateBookForm): Promise<Book> {
    const foundBook = await this.repository.findById(id);

    if (!foundBook) {
      throw new NotFoundException(`Cannot find book with '${id}' as id`);
    }

    const { title, category, releaseDate } = form;

    foundBook.title = title;
    foundBook.category = category;
    foundBook.releaseDate = releaseDate;

    await this.repository.save(foundBook);

    return foundBook;
  }
}

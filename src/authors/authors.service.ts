import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { Author } from '../entities/authors.entity';
import { AuthorCreateForm } from './forms/author-create-form';
import { AuthorUpdateForm } from './forms/author-update-form';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(AuthorsRepository) private readonly repository: AuthorsRepository) {
  }

  async listAll(): Promise<Author[]> {
    return this.repository.findAll();
  }

  createAuthorFrom(form: AuthorCreateForm) {
    const { name, gender } = form;

    const author = new Author();
    author.name = name;
    author.gender = gender;

    return this.repository.save(author);
  }

  async showAuthorWithId(id: number): Promise<Author> {
    const foundAuthor = await this.repository.findById(id);

    if (foundAuthor) {
      return foundAuthor;
    }

    throw new NotFoundException(`Cannot find author with '${id}' as id`);
  }

  async removeAuthorById(id: number): Promise<void> {
    const wasDeleted = await this.repository.deleteById(id);

    if (!wasDeleted) {
      throw new NotFoundException(`Cannot find author with '${id}' as id`);
    }
  }

  async updateAuthorFrom(id: number, form: AuthorUpdateForm): Promise<Author> {
    const foundAuthor = await this.repository.findById(id);

    if (!foundAuthor) {
      throw new NotFoundException(`Cannot find author with '${id}' as id`);
    }

    const { name, gender } = form;

    foundAuthor.name = name;
    foundAuthor.gender = gender;

    await this.repository.save(foundAuthor);

    return foundAuthor;
  }
}

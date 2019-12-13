import { Module } from '@nestjs/common';
import { Book } from './books.entity';
import { Author } from './authors.entity';

@Module({
  providers: [Author, Book],
  exports: [Author, Book],
})
export class EntitiesModule {}

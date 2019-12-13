import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule, TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

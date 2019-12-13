import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../entities/books.entity';
import { BookCreationForm } from './forms/book-creation-form';
import { Response } from 'express';
import { UpdateBookForm } from './forms/book-update-form';
import { RequireRoles } from '../security/security.decorator';
import { Role } from '../entities/users.entity';
import {
  ApiAcceptedResponse,
  ApiBearerAuth, ApiBody, ApiConsumes,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth()
@RequireRoles(Role.CUSTOMER)
export class BooksController {
  constructor(private readonly service: BooksService) {
  }

  @Get()
  @ApiOkResponse({ isArray: true, description: 'Retrieve all books', type: Book })
  @ApiProduces('application/json')
  async list(): Promise<Book[]> {
    return this.service.listAll();
  }

  @Get(':id')
  @ApiProduces('application/json')
  @ApiOkResponse({ type: Book, description: 'The book was found' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async show(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.service.showBy(id);
  }

  @Post()
  @RequireRoles(Role.ADMIN)
  @ApiBody({ type: BookCreationForm })
  @ApiConsumes('application/json')
  async register(@Body(ValidationPipe) form: BookCreationForm, @Res() response: Response): Promise<void> {
    const bookId = await this.service.register(form);

    response.setHeader('Location', `/books/${bookId}`);
    response.send();
  }

  @Delete(':id')
  @HttpCode(204)
  @RequireRoles(Role.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.removeById(id);
  }

  @Put(':id')
  @HttpCode(202)
  @RequireRoles(Role.ADMIN)
  @ApiConsumes('application/json')
  @ApiAcceptedResponse({ type: Book })
  async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) form: UpdateBookForm): Promise<Book> {
    return this.service.updateBookFrom(id, form);
  }
}

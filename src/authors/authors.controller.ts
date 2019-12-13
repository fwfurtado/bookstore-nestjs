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
import { Response } from 'express';
import { AuthorsService } from './authors.service';
import { Author } from '../entities/authors.entity';
import { AuthorCreateForm } from './forms/author-create-form';
import { AuthorUpdateForm } from './forms/author-update-form';
import { RequireRoles } from '../security/security.decorator';
import { Role } from '../entities/users.entity';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from '../entities/books.entity';

@Controller('authors')
@RequireRoles(Role.CUSTOMER)
@ApiTags('Authors')
@ApiBearerAuth()
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {
  }

  @Get()
  @ApiProduces('application/json')
  @ApiOkResponse({ type: Author, isArray: true })
  async list(): Promise<Author[]> {
    return this.service.listAll();
  }

  @Get(':id')
  @ApiProduces('application/json')
  @ApiOkResponse({ type: Author })
  async show(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.service.showAuthorWithId(id);
  }

  @Post()
  @RequireRoles(Role.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiBody({ type: AuthorCreateForm })
  @ApiConsumes('application/json')
  async create(@Body() form: AuthorCreateForm, @Res() response: Response): Promise<void> {

    const author = await this.service.createAuthorFrom(form);

    response.setHeader('Location', `/authors/${author.id}`);

    response.json(author);
  }

  @Delete(':id')
  @RequireRoles(Role.ADMIN)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.removeAuthorById(id);
  }

  @Put(':id')
  @RequireRoles(Role.ADMIN)
  @HttpCode(202)
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({ type: AuthorUpdateForm })
  @ApiAcceptedResponse({ type: Author })
  async update(@Param('id', ParseIntPipe) id: number, @Body() form: AuthorUpdateForm): Promise<Author> {
    return this.service.updateAuthorFrom(id, form);
  }
}

import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/typeorm.constant';
import { SecurityModule } from './security/security.module';
import { EntitiesModule } from './entities/entities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    BooksModule,
    AuthorsModule,
    SecurityModule,
    EntitiesModule,
    UsersModule,
    AuthModule,
    InfraModule,
  ],
})
export class AppModule {}

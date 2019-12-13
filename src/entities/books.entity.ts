import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './authors.entity';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ type: 'date' })
  @Column()
  releaseDate: Date;

  @Column()
  @ApiProperty({ enum: Category })
  category: Category;

  @ApiProperty({ isArray: true, type: Author })
  @ManyToMany(() => Author)
  @JoinTable({ name: 'books_of_authors' })
  authors: Author[];
}

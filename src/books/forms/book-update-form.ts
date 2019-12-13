import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../entities/category.entity';

export class UpdateBookForm {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  @IsOptional()
  category: Category;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'date' })
  releaseDate: Date;
}

import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../entities/category.entity';

export class BookCreationForm {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'date' })
  @IsDate()
  releaseDate: Date;

  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  category: Category;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: Number })
  authorIds: number[];
}

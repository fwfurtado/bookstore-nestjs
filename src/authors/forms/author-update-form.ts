import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../entities/gender.entity';

export class AuthorUpdateForm {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;
}

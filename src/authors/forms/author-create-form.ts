import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../entities/gender.entity';

export class AuthorCreateForm {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;
}

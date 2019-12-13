import { Role } from '../../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserView {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: Role, isArray: true })
  roles: Role[];
}

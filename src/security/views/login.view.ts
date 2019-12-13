import { ApiProperty } from '@nestjs/swagger';

export class LoginView {
  @ApiProperty()
  accessToken: string;
}

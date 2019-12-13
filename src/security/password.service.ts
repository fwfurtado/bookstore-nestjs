import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  async encode(rawPassword: string): Promise<string> {
    return  bcrypt.hash(rawPassword, 10);
  }

  async match(rawPassword: string, encodedPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, encodedPassword);
  }
}

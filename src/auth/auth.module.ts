import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SecurityModule } from '../security/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [AuthController],
})
export class AuthModule {}

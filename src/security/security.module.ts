import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config/jwt.constant';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SECURITY_CONFIG } from '../config/security.constant';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { SecurityGuard } from './security.guard';

@Module({
  imports: [UsersModule, JwtModule.register(JWT_CONFIG), PassportModule.register(SECURITY_CONFIG)],
  providers: [SecurityService, PasswordService, JwtStrategy],
  exports: [SecurityService, JwtStrategy, PassportModule],
})
export class SecurityModule {}

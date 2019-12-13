import { Role } from '../entities/users.entity';
import { createParamDecorator, UseGuards } from '@nestjs/common';
import { SecurityGuard } from './security.guard';

export const RequireRoles = (...roles: Role[]) => UseGuards(new SecurityGuard(roles));
export const CurrentUser = createParamDecorator((data, req) => req.user);

import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserView } from './views/current-user.view';
import { STRATEGY_TYPE } from '../config/security.constant';

const requireNonNull = (value: any, exception: Error = new Error('Value is null')) => {
  if (!value) {
    throw exception;
  }
};

const requireNull = (value: any, exception: Error = new Error('Value is not null')) => {
  if (value) {
    if (value instanceof Error) {
      throw value;
    }
    throw exception;
  }
};

const extractRolesOf = (user: CurrentUserView) => (roles: Role[]) => user.roles.some(role => roles.includes(role));

export class SecurityGuard extends AuthGuard(STRATEGY_TYPE) {

  constructor(private readonly roles?: Role[]) {
    super();
  }

  handleRequest(error, user: CurrentUserView, info: any, context: any): any {
    requireNull(error);
    requireNonNull(user, new UnauthorizedException());

    if (!this.roles) {
      return user;
    }

    const userHasAnyRoleOf = extractRolesOf(user);

    if (userHasAnyRoleOf(this.roles)) {
      return user;
    }

    throw new UnauthorizedException();
  }
}

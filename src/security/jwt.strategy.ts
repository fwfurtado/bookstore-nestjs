import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './commands/jwt-payload.command';
import { CurrentUserView } from './views/current-user.view';
import { UsersService } from '../users/users.service';
import { InvalidPayloadException } from './exeptions/invalid-payload.exception';
import { JWT_STRATEGY_CONFIG } from '../config/jwt.constant';
import { LoggerFactory } from '../infra/logger.factory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super(JWT_STRATEGY_CONFIG);
  }

  async validate(payload: JwtPayload): Promise<CurrentUserView> {
    LOGGER.log(`Receive jwt payload: ${JSON.stringify(payload)}`)

    const { username } = payload;

    const foundUser = await this.usersService.loadUserByUsername(username);

    if (!foundUser) {
      LOGGER.error(`Cannot find user ${username}`);
      throw new InvalidPayloadException('Invalid jwt payload');
    }

    const { id, roles } = foundUser;
    const currentUser = { id, username, roles };

    LOGGER.verbose(`Current user in token ${JSON.stringify(currentUser)}`);

    return currentUser;

  }
}

const LOGGER = LoggerFactory.getLogger(JwtStrategy);

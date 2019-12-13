import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersService } from '../users/users.service';
import { LoginCommand } from './commands/login.command';
import { LoginView } from './views/login.view';
import { LoginFailedException } from './exeptions/login-failed.exception';
import { UserAlreadyExistException } from '../users/exceptions/user-already-exist.exception';
import { SignUpFailedException } from './exeptions/signup-failed.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './commands/jwt-payload.command';
import { LoggerFactory } from '../infra/logger.factory';

@Injectable()
export class SecurityService {
  constructor(private readonly passwordService: PasswordService,
              private readonly userService: UsersService,
              private readonly jwtService: JwtService) {}

  async login(loginCommand: LoginCommand): Promise<LoginView> {
    const { username, password } = loginCommand;
    const user = await this.userService.loadUserByUsername(username);

    if (!user) {
      throw new LoginFailedException(`Cannot login user ${username}`);
    }

    const match = await this.passwordService.match(password, user.password);

    if (match) {
      const payload: JwtPayload = { username };

      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new LoginFailedException(`Invalid Credentials`);
  }

  async registerUser(username: string, rawPassword: string): Promise<void> {
    const password = await this.passwordService.encode(rawPassword);

    try {
      await this.userService.registerCustomerUser(username, password);
    } catch (e) {

      if (e instanceof UserAlreadyExistException) {
        throw new SignUpFailedException(e.message);
      }

      throw e;
    }
  }
}

const LOGGER = LoggerFactory.getLogger(SecurityService);

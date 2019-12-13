import { Body, ConflictException, Controller, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { SignUpCommand } from './commands/sign-up.command';
import { SecurityService } from '../security/security.service';
import { SignUpFailedException } from '../security/exeptions/signup-failed.exception';
import { SignInCommand } from './commands/sign-in.command';
import { LoginFailedException } from '../security/exeptions/login-failed.exception';
import { LoginView } from '../security/views/login.view';
import { CurrentUserView } from '../security/views/current-user.view';
import { RequireRoles, CurrentUser } from '../security/security.decorator';
import { Role } from '../entities/users.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AuthController {

  constructor(private readonly service: SecurityService) {
  }

  @ApiTags('Auth')
  @Post('sign-up')
  @ApiBody({ type: SignUpCommand })
  @ApiConsumes('application/json')
  @ApiCreatedResponse({ description: 'Created a user' })
  @ApiConflictResponse({ description: 'User already exists' })
  async signUp(@Body(ValidationPipe) command: SignUpCommand): Promise<void> {
    const { username, password } = command;

    try {
      await this.service.registerUser(username, password);
    } catch (e) {
      if (e instanceof SignUpFailedException) {
        throw new ConflictException(e.message);
      }

      throw e;
    }
  }

  @ApiTags('Auth')
  @Post('sign-in')
  @ApiBody({ type: SignInCommand })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiCreatedResponse({ description: 'Retrieve the access token' })
  async signIn(@Body(ValidationPipe) command: SignInCommand): Promise<LoginView> {
    const { username, password } = command;
    try {
      return this.service.login({ username, password });
    } catch (e) {
      if (e instanceof LoginFailedException) {
        throw new UnauthorizedException('Invalid credentials');
      }

      throw e;
    }
  }

  @Post('me')
  @RequireRoles(Role.CUSTOMER)
  @ApiBearerAuth()
  @ApiTags('User Informations')
  @ApiProduces('application/json')
  @ApiOkResponse({ description: 'Current logged user information', type: CurrentUserView })
  me(@CurrentUser() user: CurrentUserView): CurrentUserView {
    return user;
  }
}

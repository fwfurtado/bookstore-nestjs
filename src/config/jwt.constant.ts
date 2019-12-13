import { JwtModuleOptions } from '@nestjs/jwt';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { configurations, EnvVar } from './config.service';

const SECRET = configurations.read(EnvVar.JWT_SECRET);

export const JWT_CONFIG: JwtModuleOptions = {
  secret: SECRET,
  signOptions: {
    expiresIn: configurations.read(EnvVar.JWT_EXPIRES),
  },
};

export const JWT_STRATEGY_CONFIG: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

import { IAuthModuleOptions } from '@nestjs/passport';

export const STRATEGY_TYPE = 'jwt';

export const SECURITY_CONFIG: IAuthModuleOptions = {
  defaultStrategy: STRATEGY_TYPE,
};

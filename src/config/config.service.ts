import { ConfigurationNotFoundError } from './exceptions/config-not-found.exception';
import * as config from 'config';
import { Type } from '@nestjs/common';

class ConfigService {
  read(name: EnvVar | string) {

    if (!name) {
      throw new ConfigurationNotFoundError(`Config name required!`);
    }

    const envVar = process.env[name];

    if (envVar) {
      return envVar;
    }

    if (config.has(name)) {
      return config.get(name);
    }

    const dottedName = name.replace('_', '.').toLowerCase();

    if (config.has(dottedName)) {
      return config.get(dottedName);
    }

    throw new ConfigurationNotFoundError(`Cannot find configuration ${name}`);
  }
}

export enum EnvVar {
  SERVER_PORT = 'SERVER_PORT',
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_USERNAME = 'DATABASE_USERNAME',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_TYPE = 'DATABASE_TYPE',
  DATABASE_SYNCHRONIZE = 'DATABASE_SYNCHRONIZE',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES = 'JWT_EXPIRES',
}

export const configurations = new ConfigService();

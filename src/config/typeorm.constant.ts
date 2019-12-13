import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configurations, EnvVar } from './config.service';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: configurations.read(EnvVar.DATABASE_TYPE),
  host: configurations.read(EnvVar.DATABASE_HOST),
  port: configurations.read(EnvVar.DATABASE_PORT),
  username: configurations.read(EnvVar.DATABASE_USERNAME),
  password: configurations.read(EnvVar.DATABASE_PASSWORD),
  database: configurations.read(EnvVar.DATABASE_NAME),
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  synchronize: configurations.read(EnvVar.DATABASE_SYNCHRONIZE),
};

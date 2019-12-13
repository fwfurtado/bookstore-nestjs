import { Injectable } from '@nestjs/common';
import {
  MicroserviceHealthIndicator,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory, TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { configurations, EnvVar } from '../config/config.service';

@Injectable()
export class HealthCheckService implements TerminusOptionsFactory {
  constructor(private readonly tcpIndicator: MicroserviceHealthIndicator, private readonly dbIndicator: TypeOrmHealthIndicator) {
  }

  createTerminusOptions(): TerminusModuleOptions {

    const healthEndpoint: TerminusEndpoint = {
        url: '/health',
        healthIndicators: [
          async () => this.tcpIndicator.pingCheck('self', {
            transport: Transport.TCP,
            options: { host: 'localhost', port: configurations.read(EnvVar.SERVER_PORT) },
          }),

          async () => this.dbIndicator.pingCheck('database', { timeout: 2000 }),
        ],
      }
    ;

    return { endpoints: [healthEndpoint] };
  }
}

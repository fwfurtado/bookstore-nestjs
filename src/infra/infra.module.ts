import { Module } from '@nestjs/common';
import { HealthCheckService } from './infra.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule.forRootAsync({ useClass: HealthCheckService })],
  providers: [HealthCheckService],
  exports: [HealthCheckService],
})
export class InfraModule {
}

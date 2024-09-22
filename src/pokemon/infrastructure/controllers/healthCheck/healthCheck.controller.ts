import { HealthCheckUseCase } from '@module/application/useCases/healthCheck/healthCheckUseCase';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly useCase: HealthCheckUseCase) {}

  @Get('ping')
  @HealthCheck()
  public async run(): Promise<HealthCheckResult> {
    const result = await this.useCase.run();

    return result;
  }
}

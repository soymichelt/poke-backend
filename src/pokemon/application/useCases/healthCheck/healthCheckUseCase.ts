import { HealthCheckResponse } from '@module/application/responses/healthCheck.response';
import { PingIndicatorService } from '@module/domain/services/pingIndicatorService';
import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/domain/useCases/base.useCase';

@Injectable()
export class HealthCheckUseCase extends BaseUseCase<void, HealthCheckResponse> {
  constructor(
    @Inject('PingIndicatorService')
    private readonly pingIndicatorService: PingIndicatorService,
  ) {
    super();
  }

  public async run(): Promise<HealthCheckResponse> {
    const props = {
      serviceName: 'Pokemon API',
      serviceUrl: 'https://pokeapi.co/api/v2',
    };

    const result = await this.pingIndicatorService.check(props);

    return {
      status: result.status,
      info: result.info,
      error: result.error,
      details: result.details,
    };
  }
}

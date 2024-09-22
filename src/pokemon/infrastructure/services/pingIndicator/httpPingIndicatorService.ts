import {
  CheckProps,
  PingIndicatorService,
} from '@module/domain/services/pingIndicatorService';
import { Injectable } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HttpPingIndicatorService implements PingIndicatorService {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly healthIndicatorService: HttpHealthIndicator,
  ) {}

  public async check(props: CheckProps): Promise<Record<string, any>> {
    const { serviceName, serviceUrl } = props;

    const result = this.healthService.check([
      () => this.healthIndicatorService.pingCheck(serviceName, serviceUrl),
    ]);

    return result;
  }
}

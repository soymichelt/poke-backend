import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { DomainException } from '@shared/domain/exceptions/domain.exception';
import { Sentry } from '@shared/infrastructure/tracking/sentry/sentryTracking';

@Catch()
export class SentryFilter implements ExceptionFilter {
  catch(exception: HttpException | DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof DomainException
          ? exception.status
          : 500;

    Sentry.captureException(exception);

    console.error(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

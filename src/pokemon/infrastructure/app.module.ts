import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { SentryModule } from '@sentry/nestjs/setup';
import { HttpWithRetryService } from '@shared/infrastructure/http/httpWithRetry.service';
import { GetPokemonController } from '@module/infrastructure/controllers/get/getPokemon.controller';
import { GetPokemonWithTypesController } from '@module/infrastructure/controllers/getWithTypes/getPokemonTypes.controller';
import { ListPokemonController } from '@module/infrastructure/controllers/list/listPokemon.controller';
import { GetPokemonUseCase } from '@module/application/useCases/get/getPokemon.useCase';
import { GetPokemonWithTypesUseCase } from '@module/application/useCases/getWithTypes/getPokemonWithTypes.useCase';
import { ListPokemonUseCase } from '@module/application/useCases/list/listPokemon.useCase';
import { HttpPokemonRepository } from '@module/infrastructure/persistence/http/httpPokemon.repository';
import { HealthCheckController } from '@module/infrastructure/controllers/healthCheck/healthCheck.controller';
import { HttpPingIndicatorService } from '@module/infrastructure/services/pingIndicator/httpPingIndicatorService';
import { HealthCheckUseCase } from '@module/application/useCases/healthCheck/healthCheckUseCase';
import { SentryFilter } from '@shared/infrastructure/tracking/sentry/sentryFilter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    SentryModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    TerminusModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: '.env',
    }),
  ],
  controllers: [
    GetPokemonController,
    GetPokemonWithTypesController,
    ListPokemonController,
    HealthCheckController,
  ],
  providers: [
    HttpWithRetryService,
    {
      provide: 'PokemonRepository',
      useClass: HttpPokemonRepository,
    },
    GetPokemonUseCase,
    GetPokemonWithTypesUseCase,
    ListPokemonUseCase,
    {
      provide: 'PingIndicatorService',
      useClass: HttpPingIndicatorService,
    },
    HealthCheckUseCase,
    {
      provide: APP_FILTER,
      useClass: SentryFilter,
    },
  ],
  exports: [HttpWithRetryService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from '@module/infrastructure/app.module';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://b64cb52b040308e4db072b5b615d7f6b@o298634.ingest.us.sentry.io/4507993051365376',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define /api prefix path
  app.setGlobalPrefix('api');

  // Enable cors
  app.enableCors();

  // Enable helmet
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Poke App')
    .setDescription('Implementation of Pokemon API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();

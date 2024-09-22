import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from '@module/infrastructure/app.module';

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

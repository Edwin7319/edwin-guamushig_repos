import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const buildOptions = () =>
  new DocumentBuilder()
    .setTitle('Reto Backend API')
    .setDescription('Reto Backend API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = buildOptions();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ always: true }));
  await app.listen(app.get(ConfigService).get('port'));
}

bootstrap();

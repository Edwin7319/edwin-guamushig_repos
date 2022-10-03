import { NestFactory } from '@nestjs/core';
import { MockServiceModule } from './mock-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MockServiceModule);
  await app.listen(3000);
}
bootstrap();

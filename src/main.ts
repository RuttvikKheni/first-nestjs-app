import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const loggre = new Logger('bootstarp');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  loggre.log('Application listen');
}
bootstrap();

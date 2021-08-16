import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { get } from 'config';

async function bootstrap() {
  const PORT = process.env.PORT || get('server');
  const loggre = new Logger('bootstarp');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  loggre.log(`Application listen ${PORT}`);
}
bootstrap();

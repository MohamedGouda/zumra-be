import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(ConfigModule.forRoot());

  await app.listen(5000);
}
bootstrap();

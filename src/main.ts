import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    //All headers that client is allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-Width',
      'apollo-require-preflight'

    ], 
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })
  await app.listen(3000);
}
bootstrap();

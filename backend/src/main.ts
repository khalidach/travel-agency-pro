import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust if frontend port differs
    credentials: true,
  });

  // Enable Validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3001); // Run backend on 3001 to avoid conflict with Next.js
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilitar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en DTO
      forbidNonWhitelisted: true, // lanza error si hay propiedades extra
      transform: true, // transforma los tipos automáticamente
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

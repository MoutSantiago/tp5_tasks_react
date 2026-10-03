import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedPorts = [
    process.env.REACT_PORT,
    process.env.REACT_PROD_PORT,
    '5173',
    '8080',
  ].filter(Boolean);
  const allowedOrigins: (string | RegExp)[] = [
    ...allowedPorts.map((port) => `http://localhost:${port}`),
    /^http:\/\/localhost(:\d+)?$/,
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

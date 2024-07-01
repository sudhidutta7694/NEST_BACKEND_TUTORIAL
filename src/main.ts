import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import allowedOrigins from 'config/allowedOrigins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin : (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

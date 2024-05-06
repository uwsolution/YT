import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL');

  console.log('frontendUrl', frontendUrl);

  if (frontendUrl) {
    app.enableCors({
      origin: frontendUrl,
    });
  }

  await app.listen(3001);
}
bootstrap();

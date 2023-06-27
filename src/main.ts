import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MulterExpresStatic,
  SwaggerConfigurations,
  UseGlobalPipes,
} from './configurations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  UseGlobalPipes(app);
  SwaggerConfigurations(app);
  MulterExpresStatic(app);

  await app.listen(5000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';

export const UseGlobalPipes = (app) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};

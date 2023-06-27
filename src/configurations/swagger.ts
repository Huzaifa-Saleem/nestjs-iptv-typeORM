import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfigurations = (app) => {
  const config = new DocumentBuilder()
    .setTitle('IPTV')
    .setDescription('THIS IS THE AUTH APIs')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};

import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Bookstore API')
  .setDescription('This is a simple api for simulate a bookstore')
  .setVersion('1.0')
  .setContact('Fernando', 'https://github.com/fwfurtado/bookstore-nestjs', 'fwfurtado@gmail.com')
  .setLicense('MIT', 'http://github.com/fwfurtado/bookstore-nestjs/LICENSE.md')
  .addBearerAuth()
  .build();

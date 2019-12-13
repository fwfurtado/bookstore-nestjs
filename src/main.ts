import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFactory } from './infra/logger.factory';
import { configurations, EnvVar } from './config/config.service';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './config/swagger.constant';

const removeHeaderMiddleware = (request, response, next) => {
  response.removeHeader('X-Powered-By');
  next();
};

const logger = LoggerFactory.getLogger(bootstrap);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('/open-api', app, document);

  app.use(removeHeaderMiddleware);

  const port = configurations.read(EnvVar.SERVER_PORT);
  await app.listen(port);

  logger.log(`Server startup. Running in port ${port}`);
}
bootstrap();

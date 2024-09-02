import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerOptions } from './config/swagger-setup';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const options = getSwaggerOptions();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const globalPrefix = process.env.API_VERSION || 'v1';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const swaggerPath = globalPrefix !== '' ? `${globalPrefix}/docs` : 'docs';
  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(3000);
  logger.log(`Application listening on port 3000`);

  const swaggerUrl = `${await app.getUrl()}/${swaggerPath}`;
  logger.log(`Swagger documentation is available at: ${swaggerUrl}`);
}
bootstrap();

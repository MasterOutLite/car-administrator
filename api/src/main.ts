import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ValidationException} from "./pipes/ValidationException";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: errors => {
      if (errors.length) {
        let messages = errors.map(value => (
          `${value.property}: ${value.value}. Type value ${typeof value.target}. ${value.contexts}.`
        ))
        throw new ValidationException(messages);
      }
    }
  }));

  const configSwagger = new DocumentBuilder()
    .setTitle('Car Administrator')
    .setDescription('Swagger Rest API')
    .setVersion('1.0.0')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, documentSwagger);

  app.enableCors();

  await app.listen(3000);
}

bootstrap();

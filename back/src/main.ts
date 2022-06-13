import './setup';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as morgan from 'morgan';

import { ApplicationModule } from './app.module';
import { IAppConfig } from './config';
import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);
  app.use(
    morgan.default(
      ':remote-addr :method :url :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
    )
  );

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, forbidUnknownValues: true, transform: true }));
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get<ConfigService<IAppConfig>>(ConfigService);

  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, configService));

  const env = configService.get('NODE_ENV');
  if (!env || env == 'development') {
    const options = new DocumentBuilder()
      .setTitle('Eduzz FIDIC api')
      .setDescription('The Eduzz FIDIC API description')
      .setVersion('1.0')
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(configService.get('PORT', 3000), '0.0.0.0');

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', err => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => console.error(err));

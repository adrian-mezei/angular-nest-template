import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';
import { AppConfig } from './configs/app.config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('bootstrap');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService<AppConfig>>('ConfigService');
    const host = configService.get<string>('HOST')!;
    const port = configService.get<number>('PORT')!;
    const basePath = configService.get<string>('BASE_PATH')!;

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.setGlobalPrefix(basePath);
    setUpSwagger(app, basePath + '/swagger');

    await app.listen(port, host);
    logger.log(`App is listening on http://${host}:${port}/${basePath}`);
}

function setUpSwagger(app: INestApplication, path: string) {
    const options = new DocumentBuilder()
        .setTitle('Template example')
        .setDescription('The example API description')
        .setVersion('3.0')
        // .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path, app, document);
}

bootstrap();

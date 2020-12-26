import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';
import { Configuration } from './app.config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService<Configuration>>('ConfigService');
    const host = configService.get<string>('HOST')!;
    const port = configService.get<number>('PORT')!;
    const basePath = configService.get<string>('BASE_PATH')!;

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.setGlobalPrefix(basePath);

    const options = new DocumentBuilder()
        .setTitle('Template example')
        .setDescription('The example API description')
        .setVersion('3.0')
        // .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(basePath + '/swagger', app, document);

    await app.listen(port, host);

    const logger = new Logger('bootstrap');
    logger.log(`App is listening on http://${host}:${port}/${basePath}`);
}
bootstrap();

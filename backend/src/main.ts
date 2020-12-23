import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';
import { Configuration } from './app.config';
import { WinstonModule } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { LoggerConfiguration } from './app.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });

    const configService = app.get<ConfigService<Configuration>>('ConfigService');
    const host = configService.get<string>('HOST');
    const port = configService.get<number>('PORT');
    const basePath = configService.get<string>('BASE_PATH');

    app.useLogger(
        WinstonModule.createLogger({
            transports: LoggerConfiguration.getTransports(configService),
        }),
    );

    app.setGlobalPrefix(basePath);

    await app.listen(port, host);

    const logger = new Logger('bootstrap');
    logger.log(`App is listening on http://${host}:${port}/${basePath}`);
}
bootstrap();

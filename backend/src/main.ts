import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';
import { Configuration } from './app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService<Configuration>>('ConfigService');
    const host = configService.get<string>('HOST');
    const port = configService.get<number>('PORT');
    const basePath = configService.get<string>('BASE_PATH');

    app.setGlobalPrefix(basePath);
    await app.listen(port, host);
    console.log(`App is listening on http://${host}:${port}/${basePath}`);
}
bootstrap();

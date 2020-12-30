import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppConfig } from './configs/app.config';
import { AppController } from './app.controller';
import { AppLoggerConfig } from './configs/app.logger-config';
import { AppService } from './app.service';
import { GoogleAuthModule } from './modules/auth/google-auth/google-auth.module';
import { LocalAuthModule } from './modules/auth/local-auth/local-auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) }),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig>) => ({
                transports: new AppLoggerConfig(configService).getTransports(),
            }),
        }),
        LocalAuthModule,
        GoogleAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

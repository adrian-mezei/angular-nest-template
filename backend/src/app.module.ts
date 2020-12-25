import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { Configuration } from './app.config';
import { AppController } from './app.controller';
import { LoggerConfiguration } from './app.logger';
import { AppService } from './app.service';
import { GoogleAuthModule } from './auth/google-auth/google-auth.module';
import { LocalAuthModule } from './auth/local-auth/local-auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ validate: config => Configuration.validate(config) }),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<Configuration>) => ({
                transports: new LoggerConfiguration(configService).getTransports(),
            }),
        }),
        LocalAuthModule,
        GoogleAuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

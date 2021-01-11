import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppConfig } from './configs/app.config';
import { AppController } from './app.controller';
import { AppLoggerConfig } from './configs/app.logger-config';
import { AppService } from './app.service';
import { GoogleAuthModule } from './modules/auth/google-auth/google-auth.module';
import { LocalAuthModule } from './modules/auth/local-auth/local-auth.module';
import { JwtAuthModule } from './modules/auth/jwt-auth/jwt-auth.module';
import { RoleModule } from './modules/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { VersionModule } from './modules/version/version.module';

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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig>) => AppConfig.getTypeOrmConfig(configService),
        }),
        LocalAuthModule,
        GoogleAuthModule,
        JwtAuthModule,
        RoleModule,
        UserModule,
        VersionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/configs/app.config';
import { UserModule } from '../../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './service/jwt-auth.service';

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig>) => ({
                secret: configService.get<string>('AUTH__JWT_SECRET'),
                signOptions: { expiresIn: '2h' },
            }),
        }),
    ],
    providers: [
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        JwtAuthService,
    ],
    exports: [JwtAuthService],
})
export class JwtAuthModule {}

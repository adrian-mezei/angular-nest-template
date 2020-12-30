import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfig } from '../../../configs/app.config';
import { UsersModule } from '../../user/user.module';
import { LocalAuthController } from './controller/local-auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalAuthService } from './service/local-auth.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AppConfig>) => ({
                secret: configService.get<string>('AUTH__JWT_SECRET'),
                signOptions: { expiresIn: '2h' },
            }),
        }),
    ],
    controllers: [LocalAuthController],
    providers: [LocalAuthService, LocalStrategy],
    exports: [LocalAuthService],
})
export class LocalAuthModule {}

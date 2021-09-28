import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/user.module';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { LocalAuthController } from './controller/local-auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalAuthService } from './service/local-auth.service';

@Module({
    imports: [UserModule, PassportModule, JwtAuthModule, ConfigModule],
    controllers: [LocalAuthController],
    providers: [LocalAuthService, LocalStrategy],
    exports: [LocalAuthService],
})
export class LocalAuthModule {}

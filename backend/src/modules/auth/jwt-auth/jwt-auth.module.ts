import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '../../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './service/jwt-auth.service';

@Module({
    imports: [UserModule, ConfigModule],
    providers: [
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        JwtAuthService,
    ],
})
export class JwtAuthModule {}

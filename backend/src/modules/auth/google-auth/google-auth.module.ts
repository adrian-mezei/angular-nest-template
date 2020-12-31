import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthController } from './controller/google-auth.controller';
import { UsersModule } from '../../user/user.module';
import { UserService } from '../../user/service/user.service';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { GoogleAuthService } from './service/google-auth.service';

@Module({
    imports: [UsersModule, ConfigModule, LocalAuthModule],
    providers: [UserService, GoogleStrategy, GoogleAuthService],
    controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}

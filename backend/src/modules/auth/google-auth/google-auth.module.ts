import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthController } from './controller/google-auth.controller';
import { UsersModule } from '../../user/user.module';
import { UsersService } from '../../user/service/user.service';
import { LocalAuthModule } from '../local-auth/local-auth.module';

@Module({
    imports: [UsersModule, ConfigModule, LocalAuthModule],
    providers: [UsersService, GoogleStrategy],
    controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}

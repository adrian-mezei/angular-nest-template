import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthService } from './service/google-auth.service';
import { GoogleAuthController } from './controller/google-auth.controller';
import { UsersModule } from '../../user/user.module';
import { UsersService } from '../../user/service/user.service';

@Module({
    imports: [UsersModule, ConfigModule],
    providers: [GoogleAuthService, UsersService, GoogleStrategy],
    controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}

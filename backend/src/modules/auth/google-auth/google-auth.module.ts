import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthController } from './controller/google-auth.controller';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/service/user.service';
import { LocalAuthModule } from '../local-auth/local-auth.module';
import { GoogleAuthService } from './service/google-auth.service';
import { RoleModule } from '../../role/role.module';

@Module({
    imports: [UserModule, ConfigModule, LocalAuthModule, RoleModule],
    providers: [UserService, GoogleStrategy, GoogleAuthService],
    controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}

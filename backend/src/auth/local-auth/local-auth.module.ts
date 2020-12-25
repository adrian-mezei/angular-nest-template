import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../user/user.module';
import { LocalAuthController } from './controller/local-auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalAuthService } from './service/local-auth.service';

@Module({
    imports: [UsersModule, PassportModule],
    controllers: [LocalAuthController],
    providers: [LocalAuthService, LocalStrategy],
})
export class LocalAuthModule {}

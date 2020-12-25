import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../../user/user.module';
import { UsersService } from '../../user/service/user.service';

@Module({
    imports: [UsersModule, ConfigModule],
    providers: [AuthService, UsersService, GoogleStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

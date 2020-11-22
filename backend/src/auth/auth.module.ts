import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [UsersModule],
    providers: [AuthService, UsersService, GoogleStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

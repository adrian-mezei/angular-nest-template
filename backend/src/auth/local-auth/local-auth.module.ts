import { Module } from '@nestjs/common';
import { LocalAuthController } from './controller/local-auth.controller';
import { LocalAuthService } from './service/local-auth.service';

@Module({
    controllers: [LocalAuthController],
    providers: [LocalAuthService],
})
export class LocalAuthModule {}

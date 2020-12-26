import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../user/service/user.service';
import { UsersModule } from '../../../user/user.module';
import { LocalAuthModule } from '../../local-auth/local-auth.module';
import { LocalAuthService } from '../../local-auth/service/local-auth.service';
import { GoogleAuthController } from './google-auth.controller';

describe('GoogleAuthController', () => {
    let controller: GoogleAuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, LocalAuthModule, JwtModule.register({ secret: 'very-secret' })],
            controllers: [GoogleAuthController],
            providers: [UsersService, LocalAuthService, ConfigService],
        }).compile();

        controller = module.get<GoogleAuthController>(GoogleAuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../user/service/user.service';
import { UsersModule } from '../../../user/user.module';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthController } from './local-auth.controller';

describe('LocalAuthController', () => {
    let controller: LocalAuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, JwtModule.register({ secret: 'very-secret' })],
            controllers: [LocalAuthController],
            providers: [LocalAuthService, UsersService],
        }).compile();

        controller = module.get<LocalAuthController>(LocalAuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../user/service/user.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from '../service/google-auth.service';

describe('GoogleAuthController', () => {
    let controller: GoogleAuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GoogleAuthController],
            providers: [GoogleAuthService, UsersService],
        }).compile();

        controller = module.get<GoogleAuthController>(GoogleAuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

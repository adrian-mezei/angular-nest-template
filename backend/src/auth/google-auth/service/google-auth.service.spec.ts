import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../user/service/user.service';
import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
    let service: GoogleAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GoogleAuthService, UsersService],
        }).compile();

        service = module.get<GoogleAuthService>(GoogleAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

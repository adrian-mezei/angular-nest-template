import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../user/service/user.service';
import { LocalAuthService } from './local-auth.service';

describe('LocalAuthService', () => {
    let service: LocalAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({ secret: 'very-secret' })],
            providers: [LocalAuthService, UserService],
        }).compile();

        service = module.get<LocalAuthService>(LocalAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

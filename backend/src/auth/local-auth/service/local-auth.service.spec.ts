import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../../user/user.module';
import { LocalAuthService } from './local-auth.service';

describe('LocalAuthService', () => {
    let service: LocalAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, JwtModule.register({ secret: 'very-secret' })],
            providers: [LocalAuthService],
        }).compile();

        service = module.get<LocalAuthService>(LocalAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

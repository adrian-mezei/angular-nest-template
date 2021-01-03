import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../role/entities/role.entity';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { LocalAuthService } from './local-auth.service';

describe('LocalAuthService', () => {
    let service: LocalAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({ secret: 'very-secret' })],
            providers: [
                LocalAuthService,
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Role),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<LocalAuthService>(LocalAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

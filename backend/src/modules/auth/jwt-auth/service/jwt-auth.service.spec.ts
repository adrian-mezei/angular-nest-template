import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../role/entities/role.entity';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthService', () => {
    let service: JwtAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtAuthService,
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

        service = module.get<JwtAuthService>(JwtAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

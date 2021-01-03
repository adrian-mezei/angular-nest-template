import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../role/entities/role.entity';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
    let service: GoogleAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleAuthService,
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

        service = module.get<GoogleAuthService>(GoogleAuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

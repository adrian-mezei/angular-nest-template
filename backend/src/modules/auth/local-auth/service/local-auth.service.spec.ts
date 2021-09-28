import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../role/entities/role.entity';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { LocalAuthService } from './local-auth.service';
import * as bcrypt from 'bcrypt';
import { RoleName } from '../../../role/role-name.enum';

describe('LocalAuthService', () => {
    let service: LocalAuthService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should return user if password is correct', async () => {
            const userUser = new User();
            userUser.id = 1;
            userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
            userUser.email = 'john.doe@gmail.com';
            userUser.firstName = 'John';
            userUser.lastName = 'Doe';
            userUser.password = bcrypt.hashSync('MySecretPw', 10);
            userUser.roles = [{ id: 1, name: RoleName.USER }];

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user = await service.validateUser('john.doe@gmail.com', 'MySecretPw');

            expect(user).toBeDefined();
        });
    });

    describe('validateUser', () => {
        it('should return undefined if password is incorrect', async () => {
            const userUser = new User();
            userUser.id = 1;
            userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
            userUser.email = 'john.doe@gmail.com';
            userUser.firstName = 'John';
            userUser.lastName = 'Doe';
            userUser.password = bcrypt.hashSync('MySecretPw', 10);
            userUser.roles = [{ id: 1, name: RoleName.USER }];

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user = await service.validateUser('john.doe@gmail.com', 'NotThePassword');

            expect(user).not.toBeDefined();
        });
    });
});

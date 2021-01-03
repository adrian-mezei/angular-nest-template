import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthController } from './local-auth.controller';
import * as bcrypt from 'bcrypt';
import { RoleName } from '../../../role/role-name.enum';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../../role/entities/role.entity';

describe('LocalAuthController', () => {
    let controller: LocalAuthController;
    let userRepository: Repository<User>;

    const userUser = new User();
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.email = 'john.doe@gmail.com';
    userUser.firstName = 'John';
    userUser.lastName = 'Doe';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({ secret: 'very-secret' })],
            controllers: [LocalAuthController],
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

        controller = module.get<LocalAuthController>(LocalAuthController);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('with valid credentials should return access token', async () => {
            const loginObject = {
                user: {
                    id: 1,
                },
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const response = await controller.login(loginObject, undefined as any);
            expect(response.accessToken).toBeDefined();
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { LocalAuthController } from './local-auth.controller';
import * as bcrypt from 'bcrypt';
import { RoleName } from '../../../role/role-name.enum';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../../role/entities/role.entity';
import { JwtAuthService } from '../../jwt-auth/service/jwt-auth.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '../../../../configs/app.config';
import { JwtModule } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('LocalAuthController', () => {
    let controller: LocalAuthController;
    let userRepository: Repository<User>;

    const userUser = new User('john.doe@gmail.com', 'John', 'Doe');
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) }),
                JwtModule.register({ secret: 'very-secret' }),
            ],
            controllers: [LocalAuthController],
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
            const response = await controller.login(loginObject as any, undefined as any);
            expect(response.accessToken).toBeDefined();
        });

        it('if disabled then with valid credentials should throw BadRequest exception', async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, AUTH__LOCAL__ENABLED: false }),
                    }),
                    JwtModule.register({ secret: 'very-secret' }),
                ],
                controllers: [LocalAuthController],
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

            const controller = module.get<LocalAuthController>(LocalAuthController);

            const loginObject = {
                user: {
                    id: 1,
                },
            };

            const fn = () => controller.login(loginObject as any, undefined as any);
            expect(fn).rejects.toThrow(new BadRequestException());
        });
    });
});

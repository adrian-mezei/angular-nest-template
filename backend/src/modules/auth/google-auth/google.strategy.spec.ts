import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from '../../../configs/app.config';
import { Role } from '../../role/entities/role.entity';
import { RoleName } from '../../role/role-name.enum';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthService } from './service/google-auth.service';
import * as bcrypt from 'bcrypt';

describe('GoogleStrategy', () => {
    let googleStrategy: GoogleStrategy;
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
            imports: [ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) })],
            providers: [
                GoogleStrategy,
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

        googleStrategy = module.get<GoogleStrategy>(GoogleStrategy);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(googleStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return existing user by email', async () => {
            const profile = {
                emails: [
                    {
                        value: 'john.doe@gmail.com',
                    },
                ],
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(userUser);
            const user: User = await googleStrategy.validate('', undefined, profile);

            expect(user).toBeDefined();
            expect(user.id).toBe(1);
        });

        it('should throw unauthorized exception if user email is not found', async () => {
            const profile = {
                emails: [
                    {
                        value: 'missing@test.com',
                    },
                ],
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const validate = () => googleStrategy.validate('', undefined, profile);

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });
    });
});

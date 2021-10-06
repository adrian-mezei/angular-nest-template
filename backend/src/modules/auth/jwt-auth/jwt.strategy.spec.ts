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
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './service/jwt-auth.service';
import * as bcrypt from 'bcrypt';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let userRepository: Repository<User>;

    const userUser = new User('john.doe@gmail.com', 'John', 'Doe');
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) })],
            providers: [
                JwtStrategy,
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
                {
                    provide: 'JwtService',
                    useClass: jest.fn(),
                },
            ],
        }).compile();

        jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(jwtStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return existing user by guid', async () => {
            const payload = { sub: '1a43d3d9-9bde-441d-ac60-372e34789c2c' };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user: User = await jwtStrategy.validate(payload);

            expect(user).toBeDefined();
            expect(user.id).toBe(1);
        });

        it('should throw unauthorized exception if user email is not found', async () => {
            const payload = { guid: 'a3bf5a0d-6e4f-4762-89ab-341af8aa2feb' };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const validate = () => jwtStrategy.validate(payload);

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });
    });
});

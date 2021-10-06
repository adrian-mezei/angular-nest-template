import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { RoleName } from '../../role/role-name.enum';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';
import { LocalStrategy } from './local.strategy';
import { LocalAuthService } from './service/local-auth.service';

describe('LocalStrategy', () => {
    let localStrategy: LocalStrategy;
    let userRepository: Repository<User>;

    const userUser = new User('john.doe@gmail.com', 'John', 'Doe');
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({ secret: 'very-secret' })],
            providers: [
                LocalStrategy,
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

        localStrategy = module.get<LocalStrategy>(LocalStrategy);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(localStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return existing user if email and password matches', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user: User = await localStrategy.validate('john.doe@gmail.com', 'MySecretPw');

            expect(user).toBeDefined();
            expect(user.id).toBe(1);
        });

        it('should throw unauthorized exception if user email is not found', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const validate = () => localStrategy.validate('missing@gmail.com', 'MySecretPw');

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });

        it('should throw unauthorized exception if user email is found but passwords do not match', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const validate = () => localStrategy.validate('john.doe@gmail.com', 'NotThePassword');

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });
    });
});

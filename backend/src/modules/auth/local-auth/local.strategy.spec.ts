import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../../../configs/app.config';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import { UserModule } from '../../user/user.module';
import { LocalAuthModule } from './local-auth.module';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
    let localStrategy: LocalStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                LocalAuthModule,
                ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) }),
                UserModule,
            ],
            providers: [LocalStrategy],
        }).compile();

        localStrategy = module.get<LocalStrategy>(LocalStrategy);
        const service = module.get<UserService>(UserService);
        service.findOneByEmail = (email: string): any =>
            [
                {
                    id: 1,
                    guid: '1a43d3d9-9bde-441d-ac60-372e34789c2c',
                    email: 'john.doe@test.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'MySecretPw',
                },
            ].find(user => user.email === email);
    });

    it('should be defined', () => {
        expect(localStrategy).toBeDefined();
    });

    it('should return existing user if email and password matches', async () => {
        const user: UserEntity = await localStrategy.validate('john.doe@test.com', 'MySecretPw');

        expect(user).toBeDefined();
        expect(user.id).toBe(1);
    });

    it('should throw unauthorized exception if user email is not found', async () => {
        const validate = () => localStrategy.validate('missing@test.com', 'MySecretPw');

        expect(validate).rejects.toEqual(new UnauthorizedException());
    });

    it('should throw unauthorized exception if user email is found but passwords do not match', async () => {
        const validate = () => localStrategy.validate('john.doe@test.com', 'NotThePassword');

        expect(validate).rejects.toEqual(new UnauthorizedException());
    });
});

import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../../../configs/app.config';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthService } from './service/google-auth.service';

describe('GoogleStrategy', () => {
    let googleStrategy: GoogleStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) })],
            providers: [GoogleStrategy, GoogleAuthService, UserService],
        }).compile();

        googleStrategy = module.get<GoogleStrategy>(GoogleStrategy);
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
        expect(googleStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return existing user by email', async () => {
            const profile = {
                emails: [
                    {
                        value: 'john.doe@test.com',
                    },
                ],
            };
            const user: UserEntity = await googleStrategy.validate('', undefined, profile);

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
            const validate = () => googleStrategy.validate('', undefined, profile);

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });
    });
});

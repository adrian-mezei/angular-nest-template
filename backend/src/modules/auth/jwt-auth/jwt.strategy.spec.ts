import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../../../configs/app.config';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './service/jwt-auth.service';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ validate: config => AppConfig.setupAndValidate(config) })],
            providers: [JwtStrategy, UserService, JwtAuthService],
        }).compile();

        jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
        const service = module.get<UserService>(UserService);
        service.findOneByGuid = (guid: string): any =>
            [
                {
                    id: 1,
                    guid: '1a43d3d9-9bde-441d-ac60-372e34789c2c',
                    email: 'john.doe@test.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'MySecretPw',
                },
            ].find(user => user.guid === guid);
    });

    it('should be defined', () => {
        expect(jwtStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return existing user by guid', async () => {
            const payload = { sub: '1a43d3d9-9bde-441d-ac60-372e34789c2c' };
            const user: UserEntity = await jwtStrategy.validate(payload);

            expect(user).toBeDefined();
            expect(user.id).toBe(1);
        });

        it('should throw unauthorized exception if user email is not found', async () => {
            const payload = { guid: 'a3bf5a0d-6e4f-4762-89ab-341af8aa2feb' };
            const validate = () => jwtStrategy.validate(payload);

            expect(validate).rejects.toEqual(new UnauthorizedException());
        });
    });
});

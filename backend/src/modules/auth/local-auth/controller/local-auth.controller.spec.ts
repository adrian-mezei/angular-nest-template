import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../user/service/user.service';
import { UsersModule } from '../../../user/user.module';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthController } from './local-auth.controller';

describe('LocalAuthController', () => {
    let controller: LocalAuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, JwtModule.register({ secret: 'very-secret' })],
            controllers: [LocalAuthController],
            providers: [LocalAuthService, UserService],
        }).compile();

        controller = module.get<LocalAuthController>(LocalAuthController);
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
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('with valid credentials should return access token', async () => {
            const loginObject = {
                user: {
                    id: 1,
                },
            };

            const response = await controller.login(loginObject);
            expect(response.access_token).toBeDefined();
        });
    });
});

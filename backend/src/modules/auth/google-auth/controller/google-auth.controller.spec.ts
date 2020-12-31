import { NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../../../../configs/app.config';
import { UserService } from '../../../user/service/user.service';
import { UserModule } from '../../../user/user.module';
import { LocalAuthModule } from '../../local-auth/local-auth.module';
import { LocalAuthService } from '../../local-auth/service/local-auth.service';
import { GoogleAuthController } from './google-auth.controller';

describe('GoogleAuthController', () => {
    describe('googleAuth', () => {
        it('should return undefined if google oauth 2.0 is enabled', async () => {
            const environmentVariablesOverride = {
                AUTH__JWT_SECRET: 'something-very-special',
                AUTH__GOOGLE_OAUTH20__ENABLED: true,
                AUTH__GOOGLE_OAUTH20__CLIENT_ID: 'something',
                AUTH__GOOGLE_OAUTH20__CLIENT_SECRET: 'something',
            };

            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    UserModule,
                    LocalAuthModule,
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [UserService, LocalAuthService, ConfigService],
            }).compile();

            const controller = module.get<GoogleAuthController>(GoogleAuthController);

            const response = await controller.googleAuth();
            expect(response).toBeUndefined();
        });

        it('should throw not found if google oauth 2.0 is not enabled', async () => {
            const environmentVariablesOverride = {
                AUTH__JWT_SECRET: 'something-very-special',
                AUTH__GOOGLE_OAUTH20__ENABLED: false,
            };

            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    UserModule,
                    LocalAuthModule,
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [UserService, LocalAuthService, ConfigService],
            }).compile();

            const controller = module.get<GoogleAuthController>(GoogleAuthController);

            const googleAuth = () => controller.googleAuth();
            expect(googleAuth).rejects.toEqual(new NotFoundException());
        });
    });

    describe('googleAuthCallback', () => {
        it('should return access token if google oauth 2.0 is enabled', async () => {
            const environmentVariablesOverride = {
                AUTH__JWT_SECRET: 'something-very-special',
                AUTH__GOOGLE_OAUTH20__ENABLED: true,
                AUTH__GOOGLE_OAUTH20__CLIENT_ID: 'something',
                AUTH__GOOGLE_OAUTH20__CLIENT_SECRET: 'something',
            };

            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    UserModule,
                    LocalAuthModule,
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [UserService, LocalAuthService, ConfigService],
            }).compile();

            const controller = module.get<GoogleAuthController>(GoogleAuthController);

            const data = {
                user: {
                    id: 1,
                    guid: '1a43d3d9-9bde-441d-ac60-372e34789c2c',
                    email: 'john.doe@test.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'MySecretPw',
                },
            };

            const response = await controller.googleAuthCallback(data);
            expect(response.access_token).toBeDefined();
        });

        it('should throw not found if google oauth 2.0 is not enabled', async () => {
            const environmentVariablesOverride = {
                AUTH__JWT_SECRET: 'something-very-special',
                AUTH__GOOGLE_OAUTH20__ENABLED: false,
            };

            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    UserModule,
                    LocalAuthModule,
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [UserService, LocalAuthService, ConfigService],
            }).compile();

            const controller = module.get<GoogleAuthController>(GoogleAuthController);

            const data = {
                user: {
                    id: 1,
                    guid: '1a43d3d9-9bde-441d-ac60-372e34789c2c',
                    email: 'john.doe@test.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'MySecretPw',
                },
            };

            const callback = () => controller.googleAuthCallback(data);
            expect(callback).rejects.toEqual(new NotFoundException());
        });
    });
});

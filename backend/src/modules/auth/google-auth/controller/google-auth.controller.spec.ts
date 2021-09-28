import { NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppConfig } from '../../../../configs/app.config';
import { Role } from '../../../role/entities/role.entity';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';
import { GoogleAuthController } from './google-auth.controller';
import * as bcrypt from 'bcrypt';
import { RoleName } from '../../../role/role-name.enum';
import { JwtAuthService } from '../../jwt-auth/service/jwt-auth.service';

describe('GoogleAuthController', () => {
    const userUser = new User();
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.email = 'john.doe@gmail.com';
    userUser.firstName = 'John';
    userUser.lastName = 'Doe';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

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
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [
                    UserService,
                    JwtAuthService,
                    ConfigService,
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
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [
                    UserService,
                    JwtAuthService,
                    ConfigService,
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
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [
                    UserService,
                    JwtAuthService,
                    ConfigService,
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

            const controller = module.get<GoogleAuthController>(GoogleAuthController);
            const userRepository = module.get(getRepositoryToken(User));

            const request = {
                user: userUser,
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const response = await controller.googleAuthCallback(request);

            expect(response.accessToken).toBeDefined();
        });

        it('should throw not found if google oauth 2.0 is not enabled', async () => {
            const environmentVariablesOverride = {
                AUTH__JWT_SECRET: 'something-very-special',
                AUTH__GOOGLE_OAUTH20__ENABLED: false,
            };

            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    JwtModule.register({ secret: 'very-secret' }),
                    ConfigModule.forRoot({
                        validate: config => AppConfig.setupAndValidate({ ...config, ...environmentVariablesOverride }),
                    }),
                ],
                controllers: [GoogleAuthController],
                providers: [
                    UserService,
                    JwtAuthService,
                    ConfigService,
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

            const controller = module.get<GoogleAuthController>(GoogleAuthController);
            const userRepository = module.get(getRepositoryToken(User));

            const request = {
                user: userUser,
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const callback = () => controller.googleAuthCallback(request);

            expect(callback).rejects.toEqual(new NotFoundException());
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { RoleName } from '../../role/role-name.enum';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let userRepository: Repository<User>;

    const userUser = new User('john.doe@gmail.com', 'John', 'Doe');
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    const adminUser = new User('john.doe.dev@gmail.com', 'John', 'Doe Dev');
    adminUser.id = 2;
    adminUser.guid = '91b2bda4-b0e4-4416-8850-43ec2fc732ce';
    adminUser.password = bcrypt.hashSync('MyOtherSecretPw', 10);
    adminUser.roles = [{ id: 2, name: RoleName.ADMIN }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
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

        controller = module.get<UserController>(UserController);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('list', () => {
        it('should return all users', async () => {
            jest.spyOn(userRepository, 'find').mockResolvedValue([userUser, adminUser]);
            const users = await controller.list();

            expect(users.length).toBe(2);
        });
    });

    describe('get', () => {
        it('should return a user if the requested user is himself', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user = await controller.get(userUser, userUser.id!);

            expect(user).toBeDefined();
        });

        it('should thrown unauthorized exception if the requested user is not himself', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const getUser = () => controller.get(userUser, userUser.id! + 1);

            expect(getUser).toThrow(new UnauthorizedException());
        });
    });
});

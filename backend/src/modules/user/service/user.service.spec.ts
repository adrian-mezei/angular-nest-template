import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { RoleName } from '../../role/role-name.enum';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    const userUser = new User();
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.email = 'john.doe@gmail.com';
    userUser.firstName = 'John';
    userUser.lastName = 'Doe';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    const adminUser = new User();
    adminUser.id = 2;
    adminUser.guid = '91b2bda4-b0e4-4416-8850-43ec2fc732ce';
    adminUser.email = 'john.doe.dev@gmail.com';
    adminUser.firstName = 'John';
    adminUser.lastName = 'Doe Dev';
    adminUser.password = bcrypt.hashSync('MyOtherSecretPw', 10);
    adminUser.roles = [{ id: 2, name: RoleName.ADMIN }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(Role),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        userService = module.get(UserService);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('findOneByGuid', () => {
        it('should return an existing user by GUID', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user = await userService.findOneByGuidWithRoles('1a43d3d9-9bde-441d-ac60-372e34789c2c');

            expect(user?.email).toBe('john.doe@gmail.com');
        });

        it('should return undefined for not existing GUID', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const user = await userService.findOneByGuidWithRoles('not-existing-guid');

            expect(user).toBeUndefined();
        });
    });

    describe('findOneByEmail', () => {
        it('should return an existing user by email', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const user = await userService.findOneByEmail('john.doe@gmail.com');

            expect(user?.guid).toBe('1a43d3d9-9bde-441d-ac60-372e34789c2c');
        });

        it('should return undefined for not existing email', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const user = await userService.findOneByEmail('missing@gmail.com');

            expect(user).toBeUndefined();
        });
    });

    describe('find', () => {
        it('should return all users', async () => {
            jest.spyOn(userRepository, 'find').mockResolvedValue([userUser, adminUser]);
            const user = await userService.find();

            expect(user.length).toBe(2);
        });
    });

    describe('updateUserDataIfEmpty', () => {
        it('should return without any update if the provided user does not have id', async () => {
            const newUser = Object.assign(userUser, { id: undefined });

            const saveSpy = jest.spyOn(userRepository, 'save');
            await userService.updateUserDataIfEmpty(newUser, 'John', 'Doe', 'url');

            expect(saveSpy).not.toHaveBeenCalled();
        });
    });

    describe('comparePassword', () => {
        it('should return false if the user with the provided id does not exist', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
            const comparePasswordResult = await userService.comparePassword(userUser, 'secret-password');

            expect(comparePasswordResult).toBeFalsy();
        });
    });
});

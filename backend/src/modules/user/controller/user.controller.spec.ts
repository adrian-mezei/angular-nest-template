import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        controller = module.get<UserController>(UserController);
        const service = module.get<UserService>(UserService);
        service.find = (): any => [
            {
                id: 1,
                guid: '1a43d3d9-9bde-441d-ac60-372e34789c2c',
                email: 'john.doe@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'MySecretPw',
            },
            {
                id: 2,
                guid: '91b2bda4-b0e4-4416-8850-43ec2fc732ce',
                email: 'john.doe.dev@gmail.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'MyOtherSecretPw',
            },
        ];
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('list', () => {
        it('should return all users', async () => {
            const users = await controller.list();

            expect(users.length).toBe(2);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
        (service as any).users = [
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
        expect(service).toBeDefined();
    });

    describe('findOneByGuid', () => {
        it('should return an existing user by GUID', async () => {
            const user = await service.findOneByGuid('1a43d3d9-9bde-441d-ac60-372e34789c2c');
            expect(user?.email).toBe('john.doe@gmail.com');
        });

        it('should return undefined for not existing GUID', async () => {
            const user = await service.findOneByGuid('not-existing-guid');
            expect(user).toBeUndefined();
        });
    });

    describe('findOneByEmail', () => {
        it('should return an existing user by email', async () => {
            const user = await service.findOneByEmail('john.doe@gmail.com');
            expect(user?.guid).toBe('1a43d3d9-9bde-441d-ac60-372e34789c2c');
        });

        it('should return undefined for not existing email', async () => {
            const user = await service.findOneByEmail('missing@gmail.com');
            expect(user).toBeUndefined();
        });
    });

    describe('find', () => {
        it('should return all users', async () => {
            const user = await service.find();
            expect(user.length).toBe(2);
        });
    });
});

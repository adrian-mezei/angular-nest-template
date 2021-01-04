import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import * as bcrypt from 'bcrypt';
import * as httpMock from 'node-mocks-http';
import { RoleName } from '../../../role/role-name.enum';
import { User } from '../../../user/entities/user.entity';
import { RequestUser } from './user-param-decorator';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { UserController } from '../../../user/controller/user.controller';
import { UserService } from '../../../user/service/user.service';
import { Role } from '../../../role/entities/role.entity';

describe('RequestUser', () => {
    let userController: UserController;
    let userRepository: Repository<User>;

    const userUser = new User();
    userUser.id = 1;
    userUser.guid = '1a43d3d9-9bde-441d-ac60-372e34789c2c';
    userUser.email = 'john.doe@gmail.com';
    userUser.firstName = 'John';
    userUser.lastName = 'Doe';
    userUser.password = bcrypt.hashSync('MySecretPw', 10);
    userUser.roles = [{ id: 1, name: RoleName.USER }];

    function getParamDecoratorFactory(_decorator: any) {
        class TestDecorator {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            public test(@RequestUser() _value) {}
        }

        const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, 'test');
        return args[Object.keys(args)[0]].factory;
    }

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

        userController = module.get<UserController>(UserController);
        userRepository = module.get(getRepositoryToken(User));
    });

    describe('decorator', () => {
        it('should extract user', async () => {
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            req.user = userUser;
            const mockDecoratorData = new ExecutionContextHost([req, res], UserController, userController.get);
            const factory = getParamDecoratorFactory(RequestUser);

            const callerUser = factory(null, mockDecoratorData);
            expect(callerUser).toStrictEqual(userUser);

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(userUser);
            const response = await userController.get(callerUser, callerUser.id);
            expect(response).toStrictEqual(userUser);
        });
    });
});

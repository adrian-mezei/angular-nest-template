import { Injectable } from '@nestjs/common';
import { Role } from '../../role/role.enum';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    private readonly users: UserEntity[];

    constructor() {
        this.users = [
            {
                id: 1,
                guid: 'abac73c3-b1a5-4afd-8ecd-e913d2599b9f',
                email: 'mezei.adrian@gmail.com',
                firstName: 'Adrián',
                lastName: 'Mezei',
                password: 'MySecretPw',
                roles: [Role.USER],
            },
            {
                id: 2,
                guid: '317635a8-b552-40e7-b0d1-2bcdfd5f51af',
                email: 'mezei.adrian.dev@gmail.com',
                firstName: 'Adrián Dev',
                lastName: 'Mezei',
                password: 'MyOtherSecretPw',
                roles: [Role.ADMIN],
            },
        ];
    }

    async findOne(id: number): Promise<UserEntity | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findOneByGuid(guid: string): Promise<UserEntity | undefined> {
        return this.users.find(user => user.guid === guid);
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.users.find(user => user.email === email);
    }

    async find(): Promise<UserEntity[]> {
        return this.users;
    }
}

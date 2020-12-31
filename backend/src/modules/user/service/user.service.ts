import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                guid: 'abac73c3-b1a5-4afd-8ecd-e913d2599b9f',
                email: 'mezei.adrian@gmail.com',
                firstName: 'Adrián',
                lastName: 'Mezei',
                password: 'MySecretPw',
            },
            {
                id: 2,
                guid: '317635a8-b552-40e7-b0d1-2bcdfd5f51af',
                email: 'mezei.adrian.dev@gmail.com',
                firstName: 'Adrián Dev',
                lastName: 'Mezei',
                password: 'MyOtherSecretPw',
            },
        ];
    }

    async findOneByGuid(guid: string): Promise<User | undefined> {
        return this.users.find(user => user.guid === guid);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async find(): Promise<User[]> {
        return this.users;
    }
}

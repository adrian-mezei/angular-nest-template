import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                email: 'mezei.adrian@gmail.com',
                firstName: 'Adrián',
                lastName: 'Mezei',
                password: 'MySecretPw',
            },
            {
                id: 2,
                email: 'mezei.adrian.dev@gmail.com',
                firstName: 'Adrián Dev',
                lastName: 'Mezei',
                password: 'MyOtherSecretPw',
            },
        ];
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}

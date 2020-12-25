import { Injectable } from '@nestjs/common';

export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                email: 'mezei.adrian@gmail.com',
                firstName: 'Adrián',
                lastName: 'Mezei',
                password: 'MySecretPw',
            },
            {
                userId: 2,
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

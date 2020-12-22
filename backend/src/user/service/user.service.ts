import { Injectable } from '@nestjs/common';

export type User = any;

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
            },
        ];
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../role/role.enum';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
        /*this.users = [
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
        ];*/
    }

    findOne(id: number): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne(id);
    }

    async findOneByGuid(guid: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne({ where: { guid } });
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    find(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }
}

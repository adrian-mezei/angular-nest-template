import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nameof } from '../../../utils/nameof/nameof.operator';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    async findOneByGuidWithRoles(guid: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { guid }, relations: [nameof<User>('roles')] });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    find(): Promise<User[]> {
        return this.userRepository.find();
    }

    async comparePassword(user: User, attempt: string): Promise<boolean> {
        const userWithPassword = await this.userRepository.findOne(user.id, { select: ['password'] });
        if (!userWithPassword) return false;

        return userWithPassword.comparePassword(attempt);
    }

    async updateUserDataIfEmpty(
        user: User,
        firstName: string | undefined,
        lastName: string | undefined,
        profileImageUrl: string | undefined,
    ): Promise<void> {
        if (user.id === undefined) return;

        if (!user.firstName && firstName) user.firstName = firstName;
        if (!user.lastName && lastName) user.lastName = lastName;
        if (!user.profileImageUrl && profileImageUrl) user.profileImageUrl = profileImageUrl;

        this.userRepository.save(user);
    }
}

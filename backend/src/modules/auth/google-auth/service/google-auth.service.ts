import { Injectable } from '@nestjs/common';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class GoogleAuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string): Promise<User | undefined> {
        return await this.userService.findOneByEmail(email);
    }
}

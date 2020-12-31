import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class GoogleAuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string): Promise<UserEntity | undefined> {
        return await this.userService.findOneByEmail(email);
    }
}

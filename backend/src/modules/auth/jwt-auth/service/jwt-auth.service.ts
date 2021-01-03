import { Injectable } from '@nestjs/common';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class JwtAuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(guid: string): Promise<User | undefined> {
        return await this.userService.findOneByGuidWithRoles(guid);
    }
}

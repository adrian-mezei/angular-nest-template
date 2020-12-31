import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class JwtAuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(guid: string): Promise<UserEntity | undefined> {
        return await this.userService.findOneByGuid(guid);
    }
}

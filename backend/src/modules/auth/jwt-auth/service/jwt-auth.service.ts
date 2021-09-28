import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class JwtAuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(guid: string): Promise<User | undefined> {
        return await this.userService.findOneByGuidWithRoles(guid);
    }

    createAccessToken(user: User): string {
        const payload = { sub: user.guid };
        return this.jwtService.sign(payload);
    }
}

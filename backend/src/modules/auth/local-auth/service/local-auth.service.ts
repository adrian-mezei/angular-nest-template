import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class LocalAuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) return undefined;

        const passwordsMatch: boolean = await this.userService.comparePassword(user, password);
        return passwordsMatch ? user : undefined;
    }

    createAccessToken(user: User): string {
        const payload = { sub: user.guid };
        return this.jwtService.sign(payload);
    }
}

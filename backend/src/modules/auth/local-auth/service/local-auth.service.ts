import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class LocalAuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        // TODO bcrypt
        if (user?.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user; // remove the password
            return result;
        }
        return undefined;
    }

    async login(user: UserEntity) {
        const payload = { sub: user.guid };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../user/service/user.service';

@Injectable()
export class LocalAuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user?.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}

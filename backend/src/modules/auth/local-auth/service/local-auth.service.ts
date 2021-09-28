import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user/service/user.service';

@Injectable()
export class LocalAuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) return undefined;

        const passwordsMatch: boolean = await this.userService.comparePassword(user, password);
        return passwordsMatch ? user : undefined;
    }
}

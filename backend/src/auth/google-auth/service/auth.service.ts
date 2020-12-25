import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../user/service/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async googleLogin(req: any) {
        if (!req.user || !req.user.email) {
            return 'No user from google.';
        }

        const user = await this.usersService.findOne(req.user.email);

        if (user === undefined) {
            return 'Not authorized user.';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }
}

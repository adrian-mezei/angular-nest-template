import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async googleLogin(req: any) {
        if (!req.user) {
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

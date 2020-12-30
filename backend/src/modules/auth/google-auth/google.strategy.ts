import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../configs/app.config';
import { UsersService } from '../../user/service/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor(private readonly configService: ConfigService<AppConfig>, private readonly usersService: UsersService) {
        super({
            clientID: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_ID'),
            clientSecret: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_SECRET'),
            callbackURL: `/api/auth/google/callback`,
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: any, profile: any): Promise<any> {
        const user = await this.usersService.findOne(profile.emails[0].value);
        // TODO Update user data if it is empty.

        /*const user = {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            picture: profile.photos[0].value,
            accessToken,
        };*/

        return user;
    }
}

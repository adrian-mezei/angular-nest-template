import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../configs/app.config';
import { GoogleAuthService } from './service/google-auth.service';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor(
        readonly configService: ConfigService<AppConfig>,
        private readonly googleAuthService: GoogleAuthService,
        private readonly userService: UserService,
    ) {
        super({
            clientID: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_ID'),
            clientSecret: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_SECRET'),
            callbackURL: `/login/google/callback`,
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: any, profile: any): Promise<any> {
        if (!profile || !profile.emails || !profile.emails[0] || !profile.emails[0].value) {
            throw new UnauthorizedException();
        }

        const user = await this.googleAuthService.validateUser(profile.emails[0].value);
        if (!user) {
            throw new UnauthorizedException();
        }

        await this.userService.updateUserDataIfEmpty(
            user,
            profile.name?.givenName,
            profile.name?.familyName,
            profile.photos?.[0]?.value,
        );

        return user;
    }
}

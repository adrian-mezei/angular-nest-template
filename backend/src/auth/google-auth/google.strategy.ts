import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../app.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor(configService: ConfigService<Configuration>) {
        super({
            clientID: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_ID'),
            clientSecret: configService.get<string>('AUTH__GOOGLE_OAUTH20__CLIENT_SECRET'),
            callbackURL: `/api/auth/google/callback`,
            scope: ['email', 'profile'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(accessToken: string, refreshToken: any, profile: any, done: VerifyCallback, any: any): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(undefined, user);
    }
}

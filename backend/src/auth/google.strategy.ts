import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './../env.validation';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService: ConfigService<EnvironmentVariables>) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: `/login/google/callback`,
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
        done(null, user);
    }
}

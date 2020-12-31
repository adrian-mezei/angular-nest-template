import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../configs/app.config';
import { JwtAuthService } from './service/jwt-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService<AppConfig>, private readonly jwtAuthService: JwtAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('AUTH__JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.jwtAuthService.validateUser(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

import { User } from '../../../user/entities/user.entity';

export class LocalAuthLoginParamDto {
    readonly email: string;
    readonly password: string;
}

export class LocalAuthLoginDto {
    accessToken: string;
    user: User;
}

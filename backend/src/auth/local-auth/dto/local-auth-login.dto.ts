import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LocalAuthLogin {
    @IsString()
    @ApiProperty({ example: 'example@mycompany.com', description: 'The email address used for login.' })
    readonly email: string;

    @IsString()
    @ApiProperty({ example: 'secretpassword', description: 'The password used for login.' })
    readonly password: string;
}

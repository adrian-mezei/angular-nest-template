import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request, HttpCode, Body, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { Public } from '../../jwt-auth/decorators/public-decorator';
import { LocalAuthLoginParamDto } from '../dtos/local-auth-login.dto';
import { LoginResponseDto } from '../../dtos/login-response.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService, private readonly configService: ConfigService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(@Request() req, @Body() _body: LocalAuthLoginParamDto): Promise<LoginResponseDto> {
        if (!this.configService.get<boolean>('AUTH__LOCAL__ENABLED')) {
            throw new BadRequestException();
        }

        const loginResponseDto: LoginResponseDto = {
            accessToken: this.localAuthService.createAccessToken(req.user),
            user: {
                id: req.user.id,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                profileImageUrl: req.user.profileImageUrl,
            },
        };

        return loginResponseDto;
    }
}

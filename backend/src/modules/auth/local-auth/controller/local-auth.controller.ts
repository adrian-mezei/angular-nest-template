import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request, HttpCode, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { Public } from '../../jwt-auth/decorators/public-decorator';
import { LocalAuthLoginParamDto } from '../dtos/local-auth-login.dto';
import { LoginResponseDto } from '../../dtos/login-response.dto';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(@Request() req, @Body() _body: LocalAuthLoginParamDto): Promise<LoginResponseDto> {
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

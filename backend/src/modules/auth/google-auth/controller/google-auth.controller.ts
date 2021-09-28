import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppConfig } from '../../../../configs/app.config';
import { LoginResponseDto } from '../../dtos/login-response.dto';
import { Public } from '../../jwt-auth/decorators/public-decorator';
import { JwtAuthService } from '../../jwt-auth/service/jwt-auth.service';
import { GoogleAuthGuard } from '../google-auth.guard';

@ApiTags('auth')
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly configService: ConfigService<AppConfig>,
        private readonly jwtAuthService: JwtAuthService,
    ) {}

    @Public()
    @Get('')
    @ApiOperation({ summary: 'Google authentication endpoint.' })
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        if (!this.configService.get<boolean>('AUTH__GOOGLE_OAUTH20__ENABLED')) {
            throw new NotFoundException();
        }
    }

    @Public()
    @Get('callback')
    @ApiOperation({ summary: 'Google authentication callback endpoint.' })
    @UseGuards(GoogleAuthGuard)
    async googleAuthCallback(@Req() req): Promise<LoginResponseDto> {
        if (!this.configService.get<boolean>('AUTH__GOOGLE_OAUTH20__ENABLED')) {
            throw new NotFoundException();
        }

        const loginResponseDto: LoginResponseDto = {
            accessToken: this.jwtAuthService.createAccessToken(req.user),
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

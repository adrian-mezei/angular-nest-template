import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppConfig } from '../../../../configs/app.config';
import { Public } from '../../jwt-auth/public-decorator';
import { LocalAuthService } from '../../local-auth/service/local-auth.service';
import { GoogleAuthGuard } from '../google-auth.guard';

@ApiTags('auth')
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly configService: ConfigService<AppConfig>,
        private readonly localAuthService: LocalAuthService,
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
    async googleAuthCallback(@Req() req) {
        if (!this.configService.get<boolean>('AUTH__GOOGLE_OAUTH20__ENABLED')) {
            throw new NotFoundException();
        }

        // TODO Create UserDto
        return { ...req.user, accessToken: this.localAuthService.createAccessToken(req.user) };
    }
}

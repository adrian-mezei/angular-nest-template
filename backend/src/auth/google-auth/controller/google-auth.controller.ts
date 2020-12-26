import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Configuration } from '../../../app.config';
import { LocalAuthService } from '../../local-auth/service/local-auth.service';
import { GoogleAuthGuard } from '../google-auth.guard';

@ApiTags('auth')
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly configService: ConfigService<Configuration>,
        private readonly localAuthService: LocalAuthService,
    ) {}

    @Get('')
    @ApiOperation({ summary: 'Google authentication endpoint.' })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async googleAuth() {}

    @Get('callback')
    @ApiOperation({ summary: 'Google authentication callback endpoint.' })
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req) {
        if (!this.configService.get<boolean>('AUTH__GOOGLE_OAUTH20__ENABLED')) {
            throw new NotFoundException();
        }

        return this.localAuthService.login(req.user);
    }
}

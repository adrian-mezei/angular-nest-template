import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Configuration } from '../../../app.config';
import { GoogleAuthGuard } from '../google-auth.guard';
import { GoogleAuthService } from '../service/google-auth.service';

@ApiTags('auth')
@Controller('auth/google')
export class GoogleAuthController {
    constructor(
        private readonly appService: GoogleAuthService,
        private readonly configService: ConfigService<Configuration>,
    ) {}

    @Get('')
    @ApiOperation({ summary: 'Google authentication endpoint.' })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async googleAuth() {}

    @Get('callback')
    @ApiOperation({ summary: 'Google authentication callback endpoint.' })
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req: Request) {
        if (!this.configService.get<boolean>('AUTH__GOOGLE_OAUTH20__ENABLED')) {
            throw new NotFoundException();
        }

        return this.appService.googleLogin(req);
    }
}

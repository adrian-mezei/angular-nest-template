import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GoogleAuthGuard } from '../google-auth.guard';
import { GoogleAuthService } from '../service/google-auth.service';

@ApiTags('auth')
@Controller('auth/google')
export class GoogleAuthController {
    constructor(private readonly appService: GoogleAuthService) {}

    @Get('')
    @ApiOperation({ summary: 'Google authentication endpoint.' })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    async googleAuth(@Req() req: any) {}

    @Get('callback')
    @ApiOperation({ summary: 'Google authentication callback endpoint.' })
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req: Request) {
        return this.appService.googleLogin(req);
    }
}

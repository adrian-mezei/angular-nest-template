import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {}

    @Get('google')
    @ApiOperation({ summary: 'Google authentication endpoint.' })
    @UseGuards(AuthGuard('google'))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    async googleAuth(@Req() req: any) {}

    @Get('google/callback')
    @ApiOperation({ summary: 'Google authentication callback endpoint.' })
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request) {
        return this.appService.googleLogin(req);
    }
}

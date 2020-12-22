import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    async googleAuth(@Req() req: any) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request) {
        return this.appService.googleLogin(req);
    }
}

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthLogin } from '../dto/local-auth-login.dto';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private authService: LocalAuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Local authentication login endpoint.' })
    @UseGuards(LocalAuthGuard)
    async login(@Request() req, @Body() body: LocalAuthLogin) {
        const user = req.user;
        return this.authService.login(req.user);
    }
}

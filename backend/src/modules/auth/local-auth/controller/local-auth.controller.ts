import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthLogin } from '../dto/local-auth-login.dto';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private readonly authService: LocalAuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Local authentication login endpoint.' })
    @ApiBody({ type: LocalAuthLogin })
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { LocalAuthLogin } from '../dto/local-auth-login.dto';
import { Public } from '../../jwt-auth/public-decorator';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) {}

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Local authentication login endpoint.' })
    @ApiBody({ type: LocalAuthLogin })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(@Request() req) {
        return this.localAuthService.login(req.user);
    }
}

import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Request, HttpCode, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthService } from '../service/local-auth.service';
import { Public } from '../../jwt-auth/public-decorator';
import { LocalAuthLoginDto, LocalAuthLoginParamDto } from '../dtos/local-auth-login.dto';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(@Request() req, @Body() _body: LocalAuthLoginParamDto): Promise<LocalAuthLoginDto> {
        // TODO Create UserDto
        return { ...req.user, accessToken: this.localAuthService.createAccessToken(req.user) };
    }
}

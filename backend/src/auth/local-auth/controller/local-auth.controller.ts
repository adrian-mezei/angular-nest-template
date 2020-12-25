import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { LocalAuthLogin } from '../dto/local-auth-login.dto';

@ApiTags('auth')
@Controller('auth/local')
export class LocalAuthController {
    @Post('login')
    @ApiOperation({ summary: 'Local authentication login endpoint.' })
    @UseGuards(LocalAuthGuard)
    async login(@Body() body: LocalAuthLogin) {
        return body.email;
    }
}

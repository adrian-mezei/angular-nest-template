import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './modules/auth/jwt-auth/decorators/public-decorator';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get('')
    @ApiOperation({ summary: 'Health check endpoint.' })
    healthCheck(): string {
        return this.appService.healthCheck();
    }
}

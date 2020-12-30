import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/jwt-auth/public-decorator';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get('')
    healthCheck(): string {
        return this.appService.healthCheck();
    }
}

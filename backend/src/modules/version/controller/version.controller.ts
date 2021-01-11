import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/jwt-auth/decorators/public-decorator';
import { version } from '../../../../../package.json';

@Controller('version')
@ApiTags('version')
export class VersionController {
    @Get('')
    @Public()
    getVersion(): { version: string } {
        return { version };
    }
}

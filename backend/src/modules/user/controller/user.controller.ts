import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    list(): Promise<UserEntity[]> {
        return this.userService.find();
    }
}

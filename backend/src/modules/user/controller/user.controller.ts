import { Controller, Get } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    list(): Promise<UserEntity[]> {
        return this.userService.find();
    }
}

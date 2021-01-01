import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../../role/role.enum';
import { Roles } from '../../role/roles.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @Roles(Role.ADMIN)
    get(): Promise<UserEntity[]> {
        return this.userService.find();
    }

    @Get(':id')
    list(@Param() params): Promise<UserEntity | undefined> {
        return this.userService.findOne(+params.id);
    }
}

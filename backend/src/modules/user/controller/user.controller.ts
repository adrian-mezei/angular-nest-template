import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleName } from '../../role/role-name.enum';
import { Roles } from '../../role/roles.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @Roles(RoleName.ADMIN)
    get(): Promise<User[]> {
        return this.userService.find();
    }

    @Get(':id')
    list(@Param() params): Promise<User | undefined> {
        return this.userService.findOne(+params.id);
    }
}

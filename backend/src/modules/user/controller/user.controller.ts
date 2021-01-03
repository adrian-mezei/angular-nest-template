import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleName } from '../../role/role-name.enum';
import { Roles } from '../../role/roles.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @Roles(RoleName.ADMIN)
    list(): Promise<User[]> {
        return this.userService.find();
    }

    @Get(':id')
    get(@Param('id') id: number): Promise<User | undefined> {
        return this.userService.findOne(id);
    }
}

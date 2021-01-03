import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RoleModule],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
    controllers: [UserController],
})
export class UserModule {}

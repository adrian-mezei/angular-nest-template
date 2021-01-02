import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';

export class RoleEntity {
    @ApiProperty({ example: 1, description: 'The id of the role.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'USER', description: 'The name of the role.' })
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        nullable: false,
    })
    name: Role;
}

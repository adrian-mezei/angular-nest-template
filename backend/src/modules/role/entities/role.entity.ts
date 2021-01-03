import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleName } from '../role-name.enum';

@Entity()
export class Role {
    @ApiProperty({ example: 1, description: 'The id of the role.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'USER', description: 'The name of the role.' })
    @Column({
        type: 'enum',
        enum: RoleName,
        default: RoleName.USER,
        nullable: false,
        unique: true,
    })
    name: RoleName;
}

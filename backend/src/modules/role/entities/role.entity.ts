import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleName } from '../role-name.enum';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: RoleName,
        default: RoleName.USER,
        nullable: false,
        unique: true,
    })
    name: RoleName;
}

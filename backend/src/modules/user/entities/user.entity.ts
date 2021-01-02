import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
    @ApiProperty({ example: 1, description: 'The id of the User.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'b5578a35-60e0-47b9-9631-5387ca437aab',
        description: 'The globally unique id of the User.',
    })
    @Column({
        unique: true,
    })
    guid: string;

    @ApiProperty({ example: 'example@mycompany.com', description: 'The email of the User.' })
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty({ example: 'John', description: 'The first name of the User.' })
    @Column()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the User.' })
    @Column()
    lastName: string;

    @ApiProperty({ example: 'secretPassword', description: 'The password of the User.' })
    @Column({ select: false })
    password: string;

    @ApiProperty({ example: 'USER', description: 'The roles of the User.' })
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    // TODO update example value
    @CreateDateColumn()
    @ApiProperty({ example: '2020-10-10', description: 'The creation date of the entity.' })
    createdAt: Date;

    // TODO update example value
    @UpdateDateColumn()
    @ApiProperty({ example: '2020-10-10', description: 'The update date of the entity.' })
    updatedAt: Date;

    // TODO update example value
    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    async generateGuid(): Promise<void> {
        this.guid = uuid.v4();
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}

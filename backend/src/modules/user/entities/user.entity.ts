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
    @ApiProperty({ example: 1, description: 'The id of the user.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'b5578a35-60e0-47b9-9631-5387ca437aab',
        description: 'The globally unique id of the user.',
    })
    @Column({
        unique: true,
    })
    guid: string;

    @ApiProperty({ example: 'example@mycompany.com', description: 'The email of the user.' })
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user.' })
    @Column()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
    @Column()
    lastName: string;

    @ApiProperty({
        example: 'https://my-profile-image.com/image.jgp',
        description: 'The url of the profile image of the user.',
    })
    @Column({ nullable: true })
    profileImageUrl?: string;

    @ApiProperty({ example: 'secretPassword', description: 'The password of the user.' })
    @Column({ select: false, nullable: true })
    password: string;

    @ApiProperty({ example: 'USER', description: 'The roles of the user.' })
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @CreateDateColumn()
    @ApiProperty({ example: '2020-01-02 13:30:44.375746', description: 'The creation time of the entity.' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ example: '2020-01-02 13:30:44.375746', description: 'The update time of the entity.' })
    updatedAt: Date;

    @DeleteDateColumn()
    @ApiProperty({ example: '2020-01-02 13:30:44.375746', description: 'The soft delete time of the entity.' })
    deletedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (this.password !== undefined) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @BeforeInsert()
    async generateGuid(): Promise<void> {
        this.guid = uuid.v4();
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}

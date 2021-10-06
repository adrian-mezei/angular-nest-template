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
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true,
    })
    guid?: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    profileImageUrl?: string;

    @Column({ select: false, nullable: true })
    @ApiHideProperty()
    password?: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles?: Role[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    constructor(email: string, firstName: string, lastName: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

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
        if (!this.password) return false;

        return await bcrypt.compare(attempt, this.password);
    }
}

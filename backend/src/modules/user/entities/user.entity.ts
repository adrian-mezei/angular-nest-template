import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ example: 1, description: 'The id of the User.' })
    userId: number;

    @ApiProperty({ example: 'example@mycompany.com', description: 'The email of the User.' })
    email: string;

    @ApiProperty({ example: 'John', description: 'The first name of the User.' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the User.' })
    lastName: string;

    @ApiProperty({ example: 'secretPassword', description: 'The password of the User.' })
    password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ example: 1, description: 'The id of the User.' })
    id: number;

    @ApiProperty({
        example: 'b5578a35-60e0-47b9-9631-5387ca437aab',
        description: 'The globally unique id of the User.',
    })
    guid: string;

    @ApiProperty({ example: 'example@mycompany.com', description: 'The email of the User.' })
    email: string;

    @ApiProperty({ example: 'John', description: 'The first name of the User.' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the User.' })
    lastName: string;

    @ApiProperty({ example: 'secretPassword', description: 'The password of the User.' })
    password: string;
}

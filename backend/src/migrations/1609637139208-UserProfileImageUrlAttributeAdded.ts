import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfileImageUrlAttributeAdded1609637139208 implements MigrationInterface {
    name = 'UserProfileImageUrlAttributeAdded1609637139208';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "profileImageUrl" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "profileImageUrl"
        `);
    }
}

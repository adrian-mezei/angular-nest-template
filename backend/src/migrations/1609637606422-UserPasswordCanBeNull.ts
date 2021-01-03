import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPasswordCanBeNull1609637606422 implements MigrationInterface {
    name = 'UserPasswordCanBeNull1609637606422';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "password" DROP NOT NULL
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "user"."password" IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            COMMENT ON COLUMN "user"."password" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "password"
            SET NOT NULL
        `);
    }
}

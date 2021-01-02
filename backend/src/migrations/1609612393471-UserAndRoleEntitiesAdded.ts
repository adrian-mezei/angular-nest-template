import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndRoleEntitiesAdded1609612393471 implements MigrationInterface {
    name = 'UserAndRoleEntitiesAdded1609612393471';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "role_name_enum" AS ENUM('USER', 'ADMIN')
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" SERIAL NOT NULL,
                "name" "role_name_enum" NOT NULL DEFAULT 'USER',
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "guid" character varying NOT NULL,
                "email" character varying NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "password" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_61ea3ae73af64f7ce8e9fe55e10" UNIQUE ("guid"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_roles_role" (
                "userId" integer NOT NULL,
                "roleId" integer NOT NULL,
                CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_4be2f7adf862634f5f803d246b"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"
        `);
        await queryRunner.query(`
            DROP TABLE "user_roles_role"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TYPE "role_name_enum"
        `);
    }
}

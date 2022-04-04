import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1649109237667 implements MigrationInterface {
    name = 'PostRefactoring1649109237667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
    }

}

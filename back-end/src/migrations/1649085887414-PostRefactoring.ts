import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1649085887414 implements MigrationInterface {
    name = 'PostRefactoring1649085887414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" character varying NOT NULL`);
    }

}

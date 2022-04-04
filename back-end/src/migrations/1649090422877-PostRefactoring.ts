import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1649090422877 implements MigrationInterface {
    name = 'PostRefactoring1649090422877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(2,0) NOT NULL`);
    }

}

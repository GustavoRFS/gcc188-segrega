import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1650120942538 implements MigrationInterface {
    name = 'PostRefactoring1650120942538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "points" integer NOT NULL, "totalPoints" integer NOT NULL, "password" character varying, "email" character varying NOT NULL, "nivel" character varying NOT NULL DEFAULT 'user', "registerToken" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

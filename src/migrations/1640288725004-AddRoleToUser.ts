import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoleToUser1640288725004 implements MigrationInterface {
    name = 'AddRoleToUser1640288725004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "email", "active", "createdDate") SELECT "id", "username", "password", "email", "active", "createdDate" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "user_role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "email", "active", "createdDate", "roleId") SELECT "id", "username", "password", "email", "active", "createdDate", "roleId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "email", "active", "createdDate", "roleId") SELECT "id", "username", "password", "email", "active", "createdDate", "roleId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "email", "active", "createdDate") SELECT "id", "username", "password", "email", "active", "createdDate" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}

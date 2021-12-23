import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAndCreateRole1640286810447
  implements MigrationInterface
{
  name = 'UpdateUserAndCreateRole1640286810447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_31f96f2013b7ac833d7682bf021" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "password", "email", "active", "createdDate") SELECT "id", "username", "password", "email", "active", "createdDate" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(`INSERT INTO "user_role" ("name") VALUES ("user")`);
    await queryRunner.query(
      `INSERT INTO "user_role" ("name") VALUES ("admin")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar(256) NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password", "email", "active", "createdDate") SELECT "id", "username", "password", "email", "active", "createdDate" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
  }
}

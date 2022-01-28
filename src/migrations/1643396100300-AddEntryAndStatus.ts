import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntryAndStatus1643396100300 implements MigrationInterface {
  name = 'AddEntryAndStatus1643396100300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("PLANNING")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("DROPPED")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("IN_PROGRESS")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("COMPLETED")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("PAUSED")`,
    );
    await queryRunner.query(
      `CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer, CONSTRAINT "FK_e97333df25e7239dd80a3f74d0b" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_04196bdea3ef80486c65b6adcb8" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_entry"("id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId") SELECT "id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId" FROM "entry"`,
    );
    await queryRunner.query(`DROP TABLE "entry"`);
    await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
    await queryRunner.query(
      `CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "entry"("id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId") SELECT "id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId" FROM "temporary_entry"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_entry"`);
    await queryRunner.query(`DROP TABLE "entry"`);
    await queryRunner.query(`DROP TABLE "status"`);
  }
}

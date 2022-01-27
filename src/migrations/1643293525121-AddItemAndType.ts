import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddItemAndType1643293525121 implements MigrationInterface {
  name = 'AddItemAndType1643293525121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_35f9c99ae0d085f062a1da15961" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("MOVIE")`,
    );
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("SERIES")`,
    );
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("ANIME_MOVIE")`,
    );
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("ANIME_SERIES")`,
    );
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("MANGA")`,
    );
    await queryRunner.query(`INTERT INTO "item_type" ("name") VALUES ("BOOK")`);
    await queryRunner.query(`INTERT INTO "item_type" ("name") VALUES ("ART")`);
    await queryRunner.query(
      `INTERT INTO "item_type" ("name") VALUES ("LIGHT_NOVEL")`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"), CONSTRAINT "FK_ff0c140f0cffd26d4c726e2842c" FOREIGN KEY ("typeId") REFERENCES "item_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_item"("id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId") SELECT "id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId" FROM "item"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"))`,
    );
    await queryRunner.query(
      `INSERT INTO "item"("id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId") SELECT "id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId" FROM "temporary_item"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_item"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "item_type"`);
  }
}

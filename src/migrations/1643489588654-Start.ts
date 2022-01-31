import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1643489588654 implements MigrationInterface {
  name = 'Start1643489588654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_35f9c99ae0d085f062a1da15961" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_31f96f2013b7ac833d7682bf021" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "email" varchar(256) NOT NULL, "password" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(128) NOT NULL, "userId" integer, CONSTRAINT "unique_list" UNIQUE ("title", "userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer, "listId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"), CONSTRAINT "FK_ff0c140f0cffd26d4c726e2842c" FOREIGN KEY ("typeId") REFERENCES "item_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_item"("id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId") SELECT "id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId" FROM "item"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "email" varchar(256) NOT NULL, "password" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "user_role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "email", "password", "active", "createdDate", "roleId") SELECT "id", "username", "email", "password", "active", "createdDate", "roleId" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(128) NOT NULL, "userId" integer, CONSTRAINT "unique_list" UNIQUE ("title", "userId"), CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_list"("id", "title", "userId") SELECT "id", "title", "userId" FROM "list"`,
    );
    await queryRunner.query(`DROP TABLE "list"`);
    await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer, "listId" integer, CONSTRAINT "FK_e97333df25e7239dd80a3f74d0b" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_04196bdea3ef80486c65b6adcb8" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c9d09b40bf726fb9e7db7462f1e" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_entry"("id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId", "listId") SELECT "id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId", "listId" FROM "entry"`,
    );
    await queryRunner.query(`DROP TABLE "entry"`);
    await queryRunner.query(`ALTER TABLE "temporary_entry" RENAME TO "entry"`);
    // Default inserts
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("MOVIE")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("SERIES")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("ANIME_MOVIE")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("ANIME_SERIES")`,
    );
    await queryRunner.query(
      `INSERT INTO "item_type" ("name") VALUES ("MANGA")`,
    );

    await queryRunner.query(
      `INSERT INTO "status" ("name") VALUES ("PLANNING")`,
    );
    await queryRunner.query(`INSERT INTO "status" ("name") VALUES ("DROPPED")`);
    await queryRunner.query(
      `INSERT INTO "status" ("name") VALUES ("IN_PROGRESS")`,
    );
    await queryRunner.query(
      `INSERT INTO "status" ("name") VALUES ("COMPLETED")`,
    );
    await queryRunner.query(`INSERT INTO "status" ("name") VALUES ("PAUSED")`);
    await queryRunner.query(`INSERT INTO "user_role" ("name") VALUES ("USER")`);
    await queryRunner.query(
      `INSERT INTO "user_role" ("name") VALUES ("MODERATOR")`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role" ("name") VALUES ("ADMIN")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" RENAME TO "temporary_entry"`);
    await queryRunner.query(
      `CREATE TABLE "entry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "score" integer NOT NULL, "comment" varchar(512) NOT NULL, "startDate" datetime, "endDate" datetime, "createDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "itemId" integer, "statusId" integer, "listId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "entry"("id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId", "listId") SELECT "id", "score", "comment", "startDate", "endDate", "createDate", "updateDate", "itemId", "statusId", "listId" FROM "temporary_entry"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_entry"`);
    await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
    await queryRunner.query(
      `CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(128) NOT NULL, "userId" integer, CONSTRAINT "unique_list" UNIQUE ("title", "userId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "list"("id", "title", "userId") SELECT "id", "title", "userId" FROM "temporary_list"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_list"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(64) NOT NULL, "email" varchar(256) NOT NULL, "password" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "roleId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "email", "password", "active", "createdDate", "roleId") SELECT "id", "username", "email", "password", "active", "createdDate", "roleId" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(256) NOT NULL, "description" varchar(2048) NOT NULL, "imageUrl" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "creationDate" datetime NOT NULL DEFAULT (datetime('now')), "updateDate" datetime NOT NULL DEFAULT (datetime('now')), "typeId" integer, CONSTRAINT "UQ_367ba5eac5399f1dc69337583c9" UNIQUE ("title"))`,
    );
    await queryRunner.query(
      `INSERT INTO "item"("id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId") SELECT "id", "title", "description", "imageUrl", "startDate", "endDate", "creationDate", "updateDate", "typeId" FROM "temporary_item"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_item"`);
    await queryRunner.query(`DROP TABLE "entry"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "list"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "item_type"`);
  }
}

import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const TypeOrmConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default TypeOrmConfig;

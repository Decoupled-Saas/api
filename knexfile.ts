import dotenv from "dotenv";
import type { Knex } from "knex";
dotenv.config();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT || "sqlite3",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "./db/migrations",
      stub: "./db/stub/migrations.stub",
    },
    seeds: {
      directory: "./db/seeds",
      extension: "ts",
    },
    log: {
      debug(message) {
        console.log(message);
      },
    },
  },

  production: {
    client: process.env.DB_CLIENT || "sqlite3",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "./data/migrations",
      stub: "./db/stub/migrations.stub",
    },
    seeds: {
      extension: "ts",
      directory: "./db/seeds",
    },
  },
};

export default config;

// @ts-ignore
import type Knex from "knex";
import type { CreateTableBuilder } from "knex";

export const createOnUpdateTrigger = (tableName: string) => `
  CREATE TRIGGER "${tableName}_updated_at"
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();`;

export const deleteOnUpdateTrigger = (tableName: string) => `
  DROP TRIGGER "${tableName}_updated_at" ON "${tableName}";
`;

// @ts-ignore
export const defaultHistoryFields = (knex: Knex, table: CreateTableBuilder): void => {
  table.boolean("active").notNullable().defaultTo(true);

  table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
  table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  table.timestamp("deletedAt");
};

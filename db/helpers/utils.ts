import type Knex from "knex";

export const createOnUpdateTrigger = (tableName: string) => `
  CREATE TRIGGER "${tableName}_updated_at"
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();`;

export const deleteOnUpdateTrigger = (tableName: string) => `
  DROP TRIGGER "${tableName}_updated_at" ON "${tableName}";
`;

// @ts-ignore
export const defaultHistoryFields = (knex: Knex, table: Knex.CreateTableBuilder): void => {
  table.boolean("active").notNullable().defaultTo(true);

  table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  table.timestamp("deleted_at");
};

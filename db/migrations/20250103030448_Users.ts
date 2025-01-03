import type { Knex } from "knex";
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from "../helpers/utils";

const tableName = "Users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.string("password");

    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}

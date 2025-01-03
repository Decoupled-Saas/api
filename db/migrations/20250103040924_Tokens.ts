import type { Knex } from "knex";
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from "../helpers/utils";

const tableName = "Tokens";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    table.string("provider").defaultTo("app");
    table.text("access");
    table.text("refresh");
    table.uuid("user_id").references("id").inTable("Users");

    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}

import type { Knex } from "knex";
import { createOnUpdateTrigger, defaultHistoryFields, deleteOnUpdateTrigger } from "../helpers/utils";

const tableName = "RolePermissions";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary().notNullable().defaultTo(knex.fn.uuid());
    table.uuid("role_id").references("id").inTable("Roles");
    table.uuid("permission_id").references("id").inTable("Permissions");

    defaultHistoryFields(knex, table);
  });
  await knex.raw(createOnUpdateTrigger(tableName));
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(deleteOnUpdateTrigger(tableName));
  await knex.schema.dropTable(tableName);
}

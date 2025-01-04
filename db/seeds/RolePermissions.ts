import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("RolePermissions").del();

  // Inserts seed entries
  await knex.raw(
    'insert into "RolePermissions" (role_id, permission_id)\n' +
      'select r.id as role_id, p.id as permission_id from "Roles" r, "Permissions" p where r.name=\'master\'',
  );
}

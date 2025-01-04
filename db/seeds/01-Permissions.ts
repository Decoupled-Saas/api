import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Permissions").del();

  // Inserts seed entries
  await knex("Permissions").insert([
    {
      name: "user_add",
      description: "Add User",
    },
    {
      name: "user_update",
      description: "Update User",
    },
    {
      name: "user_get",
      description: "Get User",
    },
    {
      name: "user_get_all",
      description: "Get All Users",
    },
    {
      name: "user_delete",
      description: "Delete User",
    },
    {
      name: "role_add",
      description: "Add Role",
    },
    {
      name: "role_update",
      description: "Update Role",
    },
    {
      name: "role_get",
      description: "Get Role",
    },
    {
      name: "role_get_all",
      description: "Get All Roles",
    },
    {
      name: "role_delete",
      description: "Delete Role",
    },
    {
      name: "permission_add",
      description: "Add Permission",
    },
    {
      name: "permission_update",
      description: "Update Permission",
    },
    {
      name: "permission_get",
      description: "Get Permission",
    },
    {
      name: "permission_get_all",
      description: "Get All Permissions",
    },
    {
      name: "permission_delete",
      description: "Delete Permission",
    },
    {
      name: "account_add",
      description: "Add Account",
    },
    {
      name: "account_update",
      description: "Update Account",
    },
    {
      name: "account_get",
      description: "Get Account",
    },
    {
      name: "account_get_all",
      description: "Get All Accounts",
    },
    {
      name: "account_delete",
      description: "Delete Account",
    },
    {
      name: "invite_add",
      description: "Add Invite",
    },
    {
      name: "invite_update",
      description: "Update Invite",
    },
    {
      name: "invite_get",
      description: "Get Invite",
    },
    {
      name: "invite_get_all",
      description: "Get All Invite",
    },
    {
      name: "invite_delete",
      description: "Delete Invite",
    },
    {
      name: "keys_add",
      description: "Add Access and Refresh Keys",
    },
    {
      name: "keys_delete",
      description: "Delete Access Refresh Keys",
    },
    {
      name: "association_get_all",
      description: "Get All Associations",
    },
    {
      name: "association_update",
      description: "Update Association",
    },
    {
      name: "association_get",
      description: "Get Association",
    },
    {
      name: "association_delete",
      description: "Delete Association",
    },
    {
      name: "association_add",
      description: "Add Association",
    },
  ]);
}

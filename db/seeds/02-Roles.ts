import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Roles").del();

  // Inserts seed entries
  await knex("Roles").insert([
    {
      name: "master",
      description: "Master",
    },
    {
      name: "owner",
      description: "Owner",
    },
    {
      name: "admin",
      description: "Admin",
    },
    {
      name: "user",
      description: "User",
    },
    {
      name: "developer",
      description: "Developer",
    },
  ]);
}

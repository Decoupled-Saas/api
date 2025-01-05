import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const iamRoleSchema = z.object({
  name: z.string().openapi({ example: "test" }),
  description: z.string().openapi({ example: "Test role" }),
});

export const iamRolesSchema = z.array(iamRoleSchema).openapi({
  example: [
    { name: "admin", description: "Admin" },
    { name: "developer", description: "Developer" },
    { name: "master", description: "Master" },
    { name: "owner", description: "Owner" },
    { name: "user", description: "User" },
  ],
});

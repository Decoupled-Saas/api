import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { authRegistry, bearerAuth } from "@/registries/authRegistry";
import { iamRoleSchema, iamRolesSchema } from "@/schemas/iamSchema";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";

export const iamRegistry = new OpenAPIRegistry();

iamRegistry.register("IAM Roles", iamRoleSchema);

authRegistry.registerPath({
  method: "get",
  path: "/iam/roles",
  tags: ["IAM Roles"],
  security: [{ [bearerAuth.name]: [] }],
  responses: createApiResponse(iamRolesSchema, "Success", StatusCodes.OK),
});

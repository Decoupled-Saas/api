import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { AuthLoginInputSchema, AuthRegisterInputSchema, AuthSchema } from "@/schemas/authSchema";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const authRegistry = new OpenAPIRegistry();
authRegistry.register("Auth", AuthSchema);
export const bearerAuth = authRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthRegisterInputSchema,
        },
      },
    },
  },
  responses: createApiResponse(AuthSchema, "Success"),
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthLoginInputSchema,
        },
      },
    },
  },
  responses: createApiResponse(AuthSchema, "Success"),
});

authRegistry.registerPath({
  method: "delete",
  path: "/logout",
  tags: ["Auth"],
  security: [{ [bearerAuth.name]: [] }],
  responses: createApiResponse(z.null(), "Success"),
});

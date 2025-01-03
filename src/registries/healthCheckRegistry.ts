import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const healthCheckRegistry = new OpenAPIRegistry();
healthCheckRegistry.registerPath({
  method: "get",
  path: "/health",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

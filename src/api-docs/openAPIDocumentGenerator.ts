import { authRegistry } from "@/registries/authRegistry";
import { healthCheckRegistry } from "@/registries/healthCheckRegistry";
import { iamRegistry } from "@/registries/iamRegistry";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, authRegistry, iamRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.3",
    info: {
      version: "1.0.0",
      title: "Swagger API",
      description: "View the raw OpenAPI Specification in JSON format [here](/api/latest/docs/swagger.json)",
    },
    servers: [
      {
        url: "/api/latest",
      },
    ],
  });
}

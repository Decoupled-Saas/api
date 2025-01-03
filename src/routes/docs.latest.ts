import { type Request, type Response, Router } from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";

const docsRouter = Router();
const openAPIDocument = generateOpenAPIDocument();

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

docsRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

// @ts-ignore
docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument, options));

export default docsRouter;

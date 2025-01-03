import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { type Request, type Response, Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Service is healthy", null);
  return handleServiceResponse(serviceResponse, res);
});

export default healthRouter;

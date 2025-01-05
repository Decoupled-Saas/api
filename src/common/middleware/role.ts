import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import type { AuthenticatedRequest } from "@/types/express";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function rolesGuard(requiredRole: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest; // Safely cast req
    const user = authenticatedReq.user;
    const role = authenticatedReq.role;
    if (!user || !role || !Array.isArray(role)) {
      const serviceResponse = ServiceResponse.failure(
        "Access denied: User not authenticated or roles not defined.",
        null,
        StatusCodes.UNAUTHORIZED,
      );
      return handleServiceResponse(serviceResponse, res);
    }

    if (!role.includes(requiredRole)) {
      const serviceResponse = ServiceResponse.failure(
        "Access denied: Insufficient role.",
        null,
        StatusCodes.UNAUTHORIZED,
      );
      return handleServiceResponse(serviceResponse, res);
    }
    next();
  };
}

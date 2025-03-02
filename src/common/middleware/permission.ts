import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { iamService } from "@/services/iamService";
import type { AuthenticatedRequest } from "@/types/express";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function permissionGuard(requiredPermission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest; // Safely cast req
    const role = authenticatedReq.role;
    const validRole = iamService.roleHasPermission(role, requiredPermission);
    if (!validRole) {
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

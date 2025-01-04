import type { AuthenticatedRequest } from "@/types/express";
import type { NextFunction, Request, Response } from "express";

export function permissionGuard(requiredPermission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authenticatedReq = req as AuthenticatedRequest; // Safely cast req
    const user = authenticatedReq.user;
    const role = authenticatedReq.role;
  };
}

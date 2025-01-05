import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { iamService } from "@/services/iamService";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class IamController {
  async getRoles(req: Request, res: Response) {
    const roles = await iamService.getRoles();

    const serviceResponse = ServiceResponse.success("Roles", roles, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  }

  async getPermission(req: Request, res: Response) {
    const permissions = await iamService.getPermissions();
    const serviceResponse = ServiceResponse.success("Permissions", permissions, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  }
}

export const iamController = new IamController();

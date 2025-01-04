import { dataValidator } from "@/common/utils/dataValidator";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { tokenService } from "@/services/tokenService";
import { userService } from "@/services/userService";
import type { AuthenticatedRequest } from "@/types/express";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const data = dataValidator(req);
    if (data.success === false) {
      // @ts-ignore
      return handleServiceResponse(data, res);
    }

    // @ts-ignore
    const { first_name, last_name, email, password } = data;

    const user = await userService.createUser(first_name, last_name, email, password);

    const serviceResponse = ServiceResponse.success("User registered", user, StatusCodes.CREATED);
    return handleServiceResponse(serviceResponse, res);
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const data = dataValidator(req);
    if (data.success === false) {
      // @ts-ignore
      return handleServiceResponse(data, res);
    }

    // @ts-ignore
    const { email, password } = data;
    const user = await userService.loginUser(email, password);
    if (!user) {
      const serviceResponse = ServiceResponse.failure("Invalid Credentials", null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    const tokens = await tokenService.generateAuthTokens(user.id);

    const serviceResponse = ServiceResponse.success("User Logged In", { user, tokens }, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    const authenticatedReq = req as AuthenticatedRequest; // Safely cast req
    await tokenService.deleteToken(authenticatedReq.user);
    const serviceResponse = ServiceResponse.success("User Logged out", null, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();

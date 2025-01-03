import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import type { AuthenticatedRequest } from "@/controllers/authController";
import { keyService } from "@/services/keyService";
import { tokenService } from "@/services/tokenService";
import type { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import type jwkToBuffer from "jwk-to-pem";
import { JWK } from "node-jose";

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.header("Authorization");
    if (!header) {
      const serviceResponse = ServiceResponse.failure(
        "Authorization header not provided",
        null,
        StatusCodes.UNAUTHORIZED,
      );
      return handleServiceResponse(serviceResponse, res);
    }

    const token = header.split(" ")[1];
    if (!token) {
      const serviceResponse = ServiceResponse.failure("Bearer token not provided", null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    let validToken: { id: string };
    try {
      validToken = await tokenService.getAccessToken(token);
    } catch (error) {
      const serviceResponse = ServiceResponse.failure("Invalid token", error, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    if (!validToken.id) {
      const serviceResponse = ServiceResponse.failure("Banned token", null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    const tokenPartial = JSON.parse(Buffer.from(token.split(".")[0], "base64").toString("ascii"));
    const accessKeys = await keyService.getKeys();
    const keys = accessKeys.map((element) => element.access_key);
    const accessKeyStore = await JWK.asKeyStore({ keys });
    const key = accessKeyStore.get(tokenPartial.kid);

    if (!key) {
      const serviceResponse = ServiceResponse.failure("Signing Key not found", null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    try {
      const pem = jwkToPem(<jwkToBuffer.JWK>key.toJSON(true));
      const decoded = jwt.verify(token, pem); // Synchronous handling of token verification
      req.user = <string>decoded.sub; // Attach decoded token info to the request object if needed
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const serviceResponse = ServiceResponse.failure(
          "Unauthorized! Access Token was expired!",
          null,
          StatusCodes.UNAUTHORIZED,
        );
        return handleServiceResponse(serviceResponse, res);
      }

      if (err instanceof NotBeforeError) {
        const serviceResponse = ServiceResponse.failure("Token not active", null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }

      if (err instanceof JsonWebTokenError) {
        const serviceResponse = ServiceResponse.failure("Token malformed", null, StatusCodes.UNAUTHORIZED);
        return handleServiceResponse(serviceResponse, res);
      }

      const serviceResponse = ServiceResponse.failure(
        "Error decoding the token, please request a new verification token, or contact Support",
        null,
        StatusCodes.UNAUTHORIZED,
      );
      return handleServiceResponse(serviceResponse, res);
    }
  } catch (error) {
    const serviceResponse = ServiceResponse.failure("Authorization required", error, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(serviceResponse, res);
  }
  return next();
}

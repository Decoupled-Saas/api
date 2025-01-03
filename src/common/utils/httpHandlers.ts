import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, type ZodSchema } from "zod";

import { ServiceResponse } from "@/common/utils/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Validation Error:", JSON.stringify(err.errors, null, 2));

      const formattedErrors = err.errors.map((e) => ({
        message: e.message,
        path: e.path.join("."),
        context: e.path[0], // e.g., body, query, or params
      }));

      const errorMessage = `Validation failed for the following fields: ${formattedErrors
        .map((e) => `[${e.context}] ${e.path}: ${e.message}`)
        .join("; ")}`;

      const statusCode = StatusCodes.BAD_REQUEST;
      const serviceResponse = ServiceResponse.failure(errorMessage, { errors: formattedErrors }, statusCode);

      return handleServiceResponse(serviceResponse, res);
    }

    next(err); // Pass unknown errors to the default error handler
  }
};

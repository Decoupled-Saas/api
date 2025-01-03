import { ServiceResponse } from "@/common/utils/serviceResponse";
import type { Request } from "express";
import { type ValidationError, matchedData, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const dataValidator = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array() as ValidationError[];
    const err = {
      message: validationErrors
        .map((element) => {
          // Check if 'path' exists, otherwise fall back to 'param' for backwards compatibility
          const fieldName = "path" in element ? element.path : (element as any).param;
          return `${fieldName} - has error ${element.msg}`;
        })
        .join(", "), // Create a readable error message
      error: validationErrors, // Attach full validation errors
    };
    return ServiceResponse.failure("Error", err.error, StatusCodes.BAD_REQUEST);
  }
  return matchedData(req);
};

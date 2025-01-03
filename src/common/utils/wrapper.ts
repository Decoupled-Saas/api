import type { NextFunction, Request, Response } from "express";

/**
 * A wrapper to handle async errors in Express routes.
 * Automatically passes errors to the next middleware.
 *
 * @param fn - The asynchronous route handler to wrap.
 * @returns A function that invokes the handler and catches any errors.
 */
export const wrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

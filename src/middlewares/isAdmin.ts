import * as errors from "restify-errors";
import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return next(new errors.ForbiddenError("You do not have permission"));
  }
  next();
};

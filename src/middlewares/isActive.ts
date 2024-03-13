import * as errors from "restify-errors";
import { Request, Response, NextFunction } from "express";

export const isActive = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user)
  if (!req.user.isActive) {
    return next(
      new errors.UnauthorizedError(
        "Inactive account already, please contact administration"
      )
    );
  }
  next();
};

import * as errors from "restify-errors";
import { Request, Response, NextFunction } from "express";
import { preRequestJsonData } from "../interfaces";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userIdFromRequest: string | undefined;

  if (req.body.data) {
    try {
      const jsonData: preRequestJsonData = JSON.parse(req.body.data);
      userIdFromRequest = jsonData.userId;
    } catch (error) {
      return next(
        new errors.BadRequestError("Invalid JSON data in request body")
      );
    }
  }

  if (!userIdFromRequest) {
    userIdFromRequest = req.body.userId;
  }

  if (!userIdFromRequest) {
    return next(new errors.BadRequestError("User ID is required"));
  }

  const userIdFromToken = req.user?._id;

  if (userIdFromToken !== userIdFromRequest) {
    return next(
      new errors.UnauthorizedError("Unauthorized access attempt detected")
    );
  }

  next();
};

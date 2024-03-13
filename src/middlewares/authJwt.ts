import * as errors from "restify-errors";
import appConfig from "../../config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new errors.UnauthorizedError("Authentication token required"));
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return next(
      new errors.BadRequestError("Invalid authentication token format")
    );
  }

  const accessToken = parts[1];
  try {
    const decodedToken = jwt.verify(accessToken, appConfig.secretKey);

    if (typeof decodedToken === "object" && decodedToken !== null) {
      req.user = decodedToken;
    } else {
      return next(
        new errors.UnauthorizedError("Invalid or malformed token payload")
      );
    }
    next();
  } catch (error) {
    if (error instanceof errors.HttpError) {
      return next(error);
    }

    if (typeof error === "object" && error !== null && "name" in error) {
      const name = (error as { name: string }).name;

      if (name === "TokenExpiredError") {
        return next(new errors.UnauthorizedError("Token expired"));
      }
    }
  }
};

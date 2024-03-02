import * as errors from "restify-errors";
import config from "../../config";
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
    const decodedToken = jwt.verify(accessToken, config.secretKey);

    if (typeof decodedToken === "object" && decodedToken !== null) {
      req.user = decodedToken;
    } else {
      return next(new errors.UnauthorizedError("Invalid token format"));
    }
    next();
  } catch (error) {
    return next(
      new errors.InternalServerError(
        "An error occurred while processing the authentication token"
      )
    );
  }
};

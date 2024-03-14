import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../utils/errorCodes";

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.statusCode && err.message) {
    const errorCode = ErrorCodes[err.message as keyof typeof ErrorCodes];
    if (errorCode) {
      res.status(errorCode.statusCode).send({ error: errorCode.message });
    } else {
      res
        .status(500)
        .send({ error: "An error occurred with an invalid error code" });
    }
  } else {
    res.status(500).send({ error: "An unexpected error occurred" });
  }
};

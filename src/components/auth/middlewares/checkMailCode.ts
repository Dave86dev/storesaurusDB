import * as errors from "restify-errors";
import * as v from "valibot";
import { Request, Response, NextFunction } from "express";
import { getDb } from "../../../db";
import { codeSchema, emailSchema } from "../services/helpers/validateData";

export const checkMailCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = getDb();
    const email = v.parse(emailSchema, req.body.email);
    const token = v.parse(codeSchema, req.body.token);

    const verifiedUser = await db.collection("PreTokens_Collection").findOne({
      email: email,
      token: token,
    });

    if (!verifiedUser) {
      throw new errors.BadRequestError("VALIDATION_FAILED");
    }

    next();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "issues" in error) {
      const validationError = error as { issues: [{ message: string }] };
      if (validationError.issues.length > 0) {
        console.log(validationError.issues[0].message)
        return next( new errors.UnauthorizedError(validationError.issues[0].message));
      }
    }

    return next(error);
  }
};

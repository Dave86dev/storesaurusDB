import * as errors from "restify-errors";
import { Request, Response, NextFunction } from "express";
import { getDb } from "../../../db";

export const checkMailCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = getDb();

    const verifiedUser = await db.collection("PreTokens_Collection").findOne({
      email: req.body.email,
      token: req.body.mailCode,
    });

    if (!verifiedUser) {
      throw new errors.BadRequestError("The submitted code is incorrect");
    }

    next();
  } catch (error) {
    throw error;
  }
};

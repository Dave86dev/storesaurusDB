import * as errors from "restify-errors";
import * as v from "valibot";
import { user, userDB } from "../models/user";
import { serviceAnswer, bodyReq, userReq } from "../../../interfaces";
import { generateToken } from "../../../utils/generateToken";
import { getDb } from "../../../db";
import { emailSchema, userNameSchema } from "./helpers/validateData";
import { MailJetService } from "./helpers/mailJetServices";
import { ObjectId } from "mongodb";

const mailJetService = new MailJetService();

export class AuthService {
  async askForDeactivation(user: userReq): Promise<serviceAnswer> {
    let sendResponse = await mailJetService.sendMailDeactivation(user._id);

    return {
      message: sendResponse.message,
    };
  }

  async insertUser(body: user): Promise<serviceAnswer> {
    try {
      const db = getDb();
      v.parse(userNameSchema, body.username);
      v.parse(emailSchema, body.email);

      body.role = "user";
      body.isActive = true;

      let user = await db.collection("Users_Collection").insertOne(body);

      const userForToken: userDB = {
        _id: user.insertedId,
        email: body.email,
        role: body.role,
        isActive: body.isActive,
      };

      const jwt = generateToken(userForToken);

      return {
        message: "User registration succesfully",
        data: jwt,
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      throw error;
    }
  }

  async loginUser(body: userDB): Promise<serviceAnswer> {
    const userForToken: userDB = {
      _id: body._id,
      email: body.email,
      role: body.role,
      isActive: body.isActive,
    };

    const jwt = generateToken(userForToken);

    return {
      message: "User authentication ok",
      data: jwt,
    };
  }

  async preLoginEmail(body: bodyReq): Promise<serviceAnswer> {
    try {
      const db = getDb();
      const email = v.parse(emailSchema, body.preEmail);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (!user) {
        throw new errors.NotFoundError("USER_NOT_FOUND");
      }

      let sendResponse = await mailJetService.sendMailCode(email);

      return {
        message: sendResponse.message,
        data: user,
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      throw error;
    }
  }

  async preRegisterEmail(body: bodyReq): Promise<serviceAnswer> {
    try {
      const db = getDb();

      const email = v.parse(emailSchema, body.preEmail);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (user) {
        throw new errors.ConflictError("USER_ALREADY_EXISTS");
      }

      let sendResponse = await mailJetService.sendMailCode(email);

      return {
        message: sendResponse.message,
      };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      throw error;
    }
  }

  async toggleUserActivation(body: bodyReq): Promise<serviceAnswer> {
    const db = getDb();

    if (!body.userId) {
      throw new errors.BadRequestError("VALIDATION_FAILED");
    }

    const user = await db
      .collection("Users_Collection")
      .findOne({ _id: new ObjectId(body.userId) });

    if (!user) {
      throw new errors.NotFoundError("USER_NOT_FOUND");
    }

    const newIsActiveStatus = !user.isActive;

    const result = await db
      .collection("Users_Collection")
      .updateOne(
        { _id: new ObjectId(body.userId) },
        { $set: { isActive: newIsActiveStatus } }
      );

    if (result.matchedCount === 0) {
      throw new errors.NotFoundError("USER_NOT_FOUND");
    }

    return {
      message: `User activation status successfully toggled to ${newIsActiveStatus}.`,
    };
  }

  async userRegister(body: bodyReq) {
    return {
      message: `Code provided for ${body.email} authentication succesful`,
      data: body.email,
    };
  }
}

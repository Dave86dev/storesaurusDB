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
    try {
      let sendResponse = await mailJetService.sendMailDeactivation(user._id);

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

  async loginUser(body: bodyReq): Promise<serviceAnswer> {
    try {
      const db = getDb();
      const email = v.parse(emailSchema, body.email);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (!user) {
        throw new errors.NotFoundError("User is non-existant in our database");
      }

      const userForToken: userDB = {
        _id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      };

      const jwt = generateToken(userForToken);

      return {
        message: "User authentication ok",
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

  async preLoginEmail(body: bodyReq): Promise<serviceAnswer> {
    try {
      const db = getDb();
      const email = v.parse(emailSchema, body.preEmail);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (!user) {
        throw new errors.NotFoundError("User is non-existant in our database");
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

  async preRegisterEmail(body: bodyReq): Promise<serviceAnswer> {
    try {
      const db = getDb();

      const email = v.parse(emailSchema, body.preEmail);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (user) {
        throw new errors.NotFoundError("User already exists in our database");
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

  async toggleUserActivation(userId: string): Promise<serviceAnswer> {
    try {
      const db = getDb();

      if (!userId) {
        throw new errors.BadRequestError("Invalid or missing userId.");
      }

      const user = await db
        .collection("Users_Collection")
        .findOne({ _id: new ObjectId(userId) });

      if (!user) {
        throw new errors.NotFoundError("User not found.");
      }

      const newIsActiveStatus = !user.isActive;

      const result = await db
        .collection("Users_Collection")
        .updateOne(
          { _id: new ObjectId(userId) },
          { $set: { isActive: newIsActiveStatus } }
        );

      if (result.matchedCount === 0) {
        throw new errors.NotFoundError("User not found.");
      }

      return {
        message: `User activation status successfully toggled to ${newIsActiveStatus}.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async userRegister(body: bodyReq) {
    return {
      message: `Code provided for ${body.email} authentication succesful`,
      data: body.email,
    };
  }
}

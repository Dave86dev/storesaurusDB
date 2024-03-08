import * as errors from "restify-errors";
import * as v from "valibot";
import { v4 as uuidv4 } from "uuid";
import { user, userDB } from "../../models/user";
import { credentials, serviceAnswer } from "../../../../interfaces";
import { generateToken } from "../../../../utils/generateToken";
import { getDb } from "../../../../db";
import { emailSchema, userNameSchema } from "./helpers/validateData";
import { sendEmail } from "../../../../utils/mailJet";

export class AuthService {
  async insertUser(newUser: user): Promise<serviceAnswer> {
    try {
      const db = getDb();
      v.parse(userNameSchema, newUser.username);
      v.parse(emailSchema, newUser.email);

      newUser.role = "user";
      newUser.isActive = true;

      await db.collection("Users_Collection").insertOne(newUser);

      return {
        message: "User successfully registered",
      };
    } catch (error: unknown) {
      const dbError = error as { code?: number };
      if (dbError.code === 11000) {
        throw new errors.ConflictError("Email already registered");
      }

      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      throw error;
    }
  }

  async loginUser(credentials: credentials): Promise<serviceAnswer> {
    try {
      const db = getDb();
      const email = v.parse(emailSchema, credentials.email);

      const user = await db.collection("Users_Collection").findOne(
        {
          email: email,
        },
        {
          projection: {
            username: 1,
            email: 1,
            password: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        }
      );

      if (!user) {
        throw new errors.NotFoundError("User is non-existant in our database");
      }

      const userForToken: userDB = {
        _id: user._id,
        email: user.email,
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

  async preRegisterEmail(preEmail: string): Promise<serviceAnswer> {
    try {
      const db = getDb();

      const email = v.parse(emailSchema, preEmail);

      const user = await db.collection("Users_Collection").findOne({
        email: email,
      });

      if (user) {
        throw new errors.NotFoundError("User already exists in our database");
      }

      const token = uuidv4();

      await db.collection("PreTokens_Collection").insertOne({
        email: email,
        token: token,
        createdAt: new Date(),
      });

      const sendingAnswer = await sendEmail(email, token);

      return {
        message: sendingAnswer.message,
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
}

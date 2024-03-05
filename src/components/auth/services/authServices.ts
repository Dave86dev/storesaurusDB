import * as errors from "restify-errors";
import * as v from "valibot";
import { user, userDB } from "../models/user";
import { credentials, serviceAnswer } from "../../../interfaces";
import { hashPassword, verifyPassword } from "../../../utils/passwordUtils";
import { generateToken } from "../../../utils/generateToken";
import { getDb } from "../../../db";
import {
  emailSchema,
  passwordSchema,
  userNameSchema,
} from "./helpers/validateData";

export class AuthService {
  async insertUser(newUser: user): Promise<serviceAnswer> {
    try {
      const db = getDb();
      //I validate credentials with valibot ^^
      v.parse(userNameSchema, newUser.username);
      v.parse(emailSchema, newUser.email);
      v.parse(passwordSchema, newUser.password);

      newUser.password = await hashPassword(newUser.password);

      await db.collection("Users_Collection").insertOne(newUser);

      return {
        message: "User successfully registered",
      };
    } catch (error: unknown) {
      //duplicated e-mail attempt
      const dbError = error as { code?: number };
      if (dbError.code === 11000) {
        throw new errors.ConflictError("Email already registered");
      }

      //valibot
      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      //restify-errors
      throw error;
    }
  }

  async loginUser(credentials: credentials): Promise<serviceAnswer> {
    try {
      const db = getDb();
      //I validate credentials with valibot ^^
      const email = v.parse(emailSchema, credentials.email);
      const password = v.parse(passwordSchema, credentials.password);

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

      const validPassword = await verifyPassword(password, user?.password);

      if (!validPassword) {
        throw new errors.InvalidCredentialsError("Invalid credentials");
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
      //valibot
      if (typeof error === "object" && error !== null && "issues" in error) {
        const validationError = error as { issues: [{ message: string }] };
        if (validationError.issues.length > 0) {
          throw new errors.UnauthorizedError(validationError.issues[0].message);
        }
      }

      //restify-errors
      throw error;
    }
  }
}

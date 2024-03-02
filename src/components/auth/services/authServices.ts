import * as errors from "restify-errors";
import { user, userDB } from "../models/user";
import { credentials } from "../../../interfaces";
import { hashPassword, verifyPassword } from "../../../utils/passwordUtils";
import { generateToken } from "../../../utils/generateToken";
import { getDb } from "../../../db";

export class AuthService {
  async insertUser(newUser: user): Promise<void> {
    const db = getDb();

    try {
      newUser.password = await hashPassword(newUser.password);

      await db.collection("Users_Collection").insertOne(newUser);
    } catch (error: unknown) {
      const dbError = error as { code?: number };

      if (dbError.code === 11000) {
        throw new errors.ConflictError("Email already registered");
      } else {
        throw new errors.InternalServerError(
          "An error occurred while registering the user"
        );
      }
    }
  }

  async loginUser(credentials: credentials): Promise<any> {
    const db = getDb();

    let { email, password } = credentials;

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
      token: jwt,
    };
  }
}

import * as errors from "restify-errors";
import { getDb } from "../../../../db";
import { serviceAnswer } from "../../../../interfaces";
import { ObjectId } from "mongodb";

export class pAuthService {
  async deactivateUser(userId: string): Promise<serviceAnswer> {
    try {
      const db = getDb();

      if (!userId) {
        throw new errors.BadRequestError("Invalid or missing userId.");
      }

      const result = await db
        .collection("Users_Collection")
        .updateOne(
          { _id: new ObjectId(userId) },
          { $set: { isActive: false } }
        );

      if (result.matchedCount === 0) {
        throw new errors.NotFoundError("User not found.");
      }

      return {
        message: "User successfully deactivated",
      };
    } catch (error: unknown) {
      throw error;
    }
  }
}

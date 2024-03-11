import * as errors from "restify-errors";
import { getDb } from "../../../../db";
import { serviceAnswer } from "../../../../interfaces";
import { ObjectId } from "mongodb";

export class pAuthService {
  
  async toggleUserActivation(userId: string): Promise<serviceAnswer> {
    try {
      const db = getDb();
  
      if (!userId) {
        throw new errors.BadRequestError("Invalid or missing userId.");
      }
  
      const user = await db.collection("Users_Collection").findOne({ _id: new ObjectId(userId) });
  
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
  
}

import * as errors from "restify-errors";
import { getDb } from "../../../../db";
import { serviceAnswer } from "../../../../interfaces";

export class FileRetrievalService {
  async searchUserFiles(userId: string): Promise<serviceAnswer> {
    try {
      const db = getDb();

      if (!userId) {
        throw new errors.BadRequestError("Missing the mandatory userId");
      }

      const userFiles = await db
        .collection("uploads.files")
        .find({ "metadata.userId": userId })
        .toArray();

      if (!userFiles || userFiles.length === 0) {
        throw new errors.NotFoundError("No files found for the given user Id");
      }

      return {
        message: "The search for user files has completed successfully.",
        data: userFiles,
      };
    } catch (error) {
      throw error;
    }
  }
}

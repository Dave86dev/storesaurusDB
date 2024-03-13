import * as errors from "restify-errors";
import { getDb } from "../../../db";
import { serviceAnswer, userReq } from "../../../interfaces";
export class FileRetrievalService {
  async searchUserFiles(user: userReq): Promise<serviceAnswer> {
    const db = getDb();

    if (!user._id) {
      throw new errors.BadRequestError("Missing the mandatory userId");
    }

    const userFiles = await db
      .collection("Uploads_Collection.files")
      .find({ "metadata.userId": user._id })
      .toArray();

    if (!userFiles || userFiles.length === 0) {
      throw new errors.NotFoundError("No files found for the given user Id");
    }

    return {
      message: "The search for user files has completed successfully.",
      data: userFiles,
    };
  }
}

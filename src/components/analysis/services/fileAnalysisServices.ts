import * as errors from "restify-errors";
import { getDb } from "../../../db";
import { csvAnalysisHelper } from "./helpers/csvAnalysisHelper";
import { bodyReq, serviceAnswer, userReq } from "../../../interfaces";
import GridFsService from "../../../services/gridFsSservices";

export class FileAnalysisService {
  async analyzeFile(body: bodyReq, user: userReq): Promise<serviceAnswer> {
    let gridFsService = new GridFsService(getDb());

    const result = await gridFsService.getFile(body.fileId, user._id);

    const { content: fileStream, mimeType } = result.data;

    if (mimeType !== "text/csv")
      throw new errors.UnsupportedMediaTypeError("Unsupported Media Type");
    const analysis = await csvAnalysisHelper(fileStream);

    return {
      message: "File analysis successful",
      data: analysis,
    };
  }

  async keepAnalysis(
    body: bodyReq,
    user: userReq,
  ): Promise<serviceAnswer> {
    const db = getDb();

    if (!body.fileId || !user._id || !body.analysisData) {
      throw new errors.BadRequestError(
        "Missing required parameters: fileId, userId, or analysisData"
      );
    }

    const analysisDocument = {
      fileId: body.fileId,
      userId: user._id,
      analysisDate: new Date(),
      analysisResults: body.analysisData,
    };

    await db.collection("Analysis_Collection").insertOne(analysisDocument);

    return {
      message: "Succesful analysis storage",
      data: analysisDocument,
    };
  }
}

import * as errors from "restify-errors";
import { getDb } from "../../../db";
import { csvAnalysisHelper } from "./helpers/csvAnalysisHelper";
import { serviceAnswer } from "../../../interfaces";
import GridFsService from "../../../services/gridFsSservices";

export class FileAnalysisService {
  async analyzeFile(fileId: string, _id: string): Promise<serviceAnswer> {
    let gridFsService = new GridFsService(getDb());

    const result = await gridFsService.getFile(fileId, _id);

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
    fileId: string,
    userId: string,
    analysisData: any
  ): Promise<serviceAnswer> {
    const db = getDb();

    if (!fileId || !userId || !analysisData) {
      throw new errors.BadRequestError(
        "Missing required parameters: fileId, userId, or analysisData"
      );
    }

    const analysisDocument = {
      fileId: fileId,
      userId: userId,
      analysisDate: new Date(),
      analysisResults: analysisData,
    };

    await db.collection("File_Analysis").insertOne(analysisDocument);

    return {
      message: "Succesful analysis storage",
      data: analysisDocument,
    };
  }
}

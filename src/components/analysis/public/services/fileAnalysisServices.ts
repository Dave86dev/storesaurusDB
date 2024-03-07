import * as errors from "restify-errors";
import { getDb } from "../../../../db";
import { csvAnalysisHelper } from "./helpers/csvAnalysisHelper";
import { serviceAnswer } from "../../../../interfaces";

export class FileAnalysisService {
  async analyzeFile(file: string, mime: string): Promise<serviceAnswer> {
    try {
      if (mime !== "text/csv")
        throw new errors.UnsupportedMediaTypeError("Unsupported Media Type");
      const analysis = await csvAnalysisHelper(file);

      return {
        message: "File analysis successful",
        data: analysis,
      };
    } catch (error) {
      throw error;
    }
  }

  async keepAnalysis(
    fileId: string,
    userId: string,
    analysisData: any
  ): Promise<serviceAnswer> {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}

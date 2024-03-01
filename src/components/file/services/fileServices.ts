import * as errors from "restify-errors";
import { csvAnalysisHelper } from "./helpers/csvAnalysisHelper";
import { csvAnalysis } from "../../../interfaces";

export class FileAnalysisService {
  async analyzeFile(file: string, mime: string): Promise<csvAnalysis[]> {
    try {
      let analysisResult: csvAnalysis[];
      if (mime !== "text/csv")
        throw new errors.UnsupportedMediaTypeError("Unsupported Media Type");
      analysisResult = await csvAnalysisHelper(file);

      return analysisResult;
    } catch (error) {
      if (error instanceof errors.HttpError) {
        throw error;
      }
      throw new errors.InternalError("Error proceeding with analysis.");
    }
  }
}

import * as errors from "restify-errors";
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
}

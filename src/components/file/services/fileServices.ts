import { csvAnalysisHelper } from "./helpers/csvAnalysisHelper";
import { csvAnalysis } from "../../../interfaces";

export class FileAnalysisService {
  async analyzeFile(file: string, mime: string): Promise<csvAnalysis[]> {
    try {
      let analysisResult: csvAnalysis[];
      if (mime !== "text/csv") throw new Error("Incorrect file content");
      analysisResult = await csvAnalysisHelper(file);

      return analysisResult;
    } catch (error) {
      console.log(error)
    }
  }
}

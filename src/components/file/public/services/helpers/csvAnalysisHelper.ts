import * as errors from "restify-errors";
import * as Papa from "papaparse";
import { csvAnalysis } from "../../../../../interfaces";

export const csvAnalysisHelper = async (
  csvContent: string
): Promise<csvAnalysis[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const missingValuesReport: csvAnalysis[] = [];
        result.data.forEach((row, index) => {
          const safeRow = row as { [key: string]: string | null | undefined };
          const missingColumns = Object.keys(safeRow).filter(
            (key) =>
              safeRow[key] === "" ||
              safeRow[key] === null ||
              safeRow[key] === undefined
          );
          if (missingColumns.length > 0) {
            missingValuesReport.push({ rowIndex: index + 1, missingColumns });
          }
        });

        resolve(missingValuesReport);
      },
      //seen in papaparse documentation
      error: (error: { message: string }) => {
        reject(
          new errors.BadRequestError(`CSV parsing error: ${error.message}`)
        );
      },
    });
  });
};

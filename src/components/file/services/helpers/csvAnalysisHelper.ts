import * as errors from "restify-errors";
import * as Papa from "papaparse";
import { csvAnalysis } from "../../../../interfaces";

export const csvAnalysisHelper = async (csvContent: string): Promise<csvAnalysis[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvContent, { 
            header: true, 
            skipEmptyLines: true, 
            complete: (result) => {
                const missingValuesReport: csvAnalysis[] = [];
                result.data.forEach((row, index) => {
                    const missingColumns = Object.keys(row).filter(key => row[key] === "" || row[key] === null || row[key] === undefined);
                    if (missingColumns.length > 0) {
                        missingValuesReport.push({ rowIndex: index + 1, missingColumns });
                    }
                });

                resolve(missingValuesReport);
            },
            error: (error) => {
                reject(new errors.BadRequestError(`CSV parsing error: ${error.message}`));
            }
        });
    });
};

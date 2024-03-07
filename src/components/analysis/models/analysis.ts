import { csvAnalysis } from "../../../interfaces";

export interface analysis {
    _id: string;
    fileId: string;
    userId: string;
    analysisResult: csvAnalysis;
    createdAt: Date;
    updatedAt?: Date;
}

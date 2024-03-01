import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    invalidFile?: string;
  }
}

export interface csvAnalysis {
    rowIndex: number,
    missingColumns: string[]
}
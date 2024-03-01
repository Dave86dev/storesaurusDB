import "express";

declare module "express-serve-static-core" {
  interface Request {
    invalidFile?: string;
  }
}

export interface csvAnalysis {
  rowIndex: number;
  missingColumns: string[];
}

export interface credentials {
  email: string;
  password: string;
}

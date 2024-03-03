import "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    invalidFile?: string;
    user: JwtPayload;
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

export interface preRequestJsonData {
  userId: string;
}

import "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    invalidFile?: string;
    user: JwtPayload;
  }
}

export interface preRequestJsonData {
  userId: string;
}

export interface credentials {
  email: string;
  password: string;
}

export interface csvAnalysis {
  rowIndex: number;
  missingColumns: string[];
}

export interface fileData {
  content: string;
  owner: string;
  mimeType: string;
}

export interface serviceAnswer {
  message?: string;
  data?: any;
}

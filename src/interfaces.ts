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
  mailCode: string;
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

export interface bodyReq {
  email?: string
  token?: string
  userId?: string
  fileId?: string
  analysisData: any
}

export interface userReq {
  _id : string
}
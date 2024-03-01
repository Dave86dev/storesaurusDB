import * as errors from "restify-errors";
import GridFsService from "../services/gridFsSservices";
import { NextFunction, Request, Response } from "express";
import { getDb } from "../../../db";
import { FileAnalysisService } from "../services/fileServices";

let gridFsService: GridFsService;
let fileAnalysisService = new FileAnalysisService();

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  gridFsService = new GridFsService(getDb());

  try {
    if (!req.file) {
      throw new errors.BadRequestError("No file uploaded.");
    }

    const fileId = await gridFsService.saveFile(req.file);
    res.json({ message: "File uploaded successfully", fileId });
  } catch (error) {
    next(error);
  }
};

export const checkFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  gridFsService = new GridFsService(getDb());

  try {
    const fileId = req.body.fileId;

    if (!fileId) {
      throw new errors.BadRequestError("Missing file Id");
    }

    const { content: fileStream, mimeType } = await gridFsService.getFile(
      fileId
    );

    const AnalysisResults = await fileAnalysisService.analyzeFile(
      fileStream,
      mimeType
    );

    res.json(AnalysisResults);
  } catch (error) {
    next(error);
  }
};

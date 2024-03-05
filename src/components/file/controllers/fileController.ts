import * as errors from "restify-errors";
import GridFsService from "../services/gridFsSservices";
import { NextFunction, Request, Response } from "express";
import { getDb } from "../../../db";
import { FileAnalysisService } from "../services/fileAnalysisServices";
import { FileRetrievalService } from "../services/fileRetrievalServices";

let gridFsService: GridFsService;
let fileAnalysisService = new FileAnalysisService();
let fileRetrievalService = new FileRetrievalService();

export const checkFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    gridFsService = new GridFsService(getDb());
    const result = await gridFsService.getFile(req.body.fileId, req.user._id);

    const { content: fileStream, mimeType } = result.data;

    const analysisResults = await fileAnalysisService.analyzeFile(
      fileStream,
      mimeType
    );

    res.status(200).json({
      message: analysisResults.message,
      data: analysisResults.data,
    });
  } catch (error) {
    next(error);
  }
};

export const retrievalFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const retrievalResults = await fileRetrievalService.searchUserFiles(
      req.body.userId, req.user._id
    );
    res.status(200).json({
      message: retrievalResults.message,
      data: retrievalResults.data,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    gridFsService = new GridFsService(getDb());
    //Exceptional error throw due to multer / GridFs nature
    if (!req.file) {
      throw new errors.BadRequestError("No file uploaded.");
    }

    const uploadAnswer = await gridFsService.saveFile(req.file, req.user._id);
    res
      .status(201)
      .json({ message: uploadAnswer.message, data: uploadAnswer.data });
  } catch (error) {
    next(error);
  }
};

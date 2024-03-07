import GridFsService from "../../../../services/gridFsSservices";
import { NextFunction, Request, Response } from "express";
import { getDb } from "../../../../db";
import { FileAnalysisService } from "../services/fileAnalysisServices";

let gridFsService: GridFsService;
let fileAnalysisService = new FileAnalysisService();

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

export const saveAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const saveResults = await fileAnalysisService.keepAnalysis(
      req.body.fileId,
      req.user._id,
      req.body.analysis
    );

    res.status(200).json({
      message: saveResults.message,
      data: saveResults.data,
    });
  } catch (error) {
    next(error);
  }
};

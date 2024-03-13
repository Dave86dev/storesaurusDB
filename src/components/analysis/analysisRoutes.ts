import express from "express";
import { authJwt } from "../../middlewares/authJwt";
import { generator } from "../../middlewares/generator";
import { FileAnalysisService } from "./services/fileAnalysisServices";

const router = express.Router();

let fileAnalysisService = new FileAnalysisService();

router.post("/analyze", authJwt, generator(fileAnalysisService.analyzeFile, ["body", "user"]));
router.post("/save", authJwt, generator(fileAnalysisService.keepAnalysis, ["body", "user"]));

export default router;

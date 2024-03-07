import express from "express";
import { authJwt } from "../../../middlewares/authJwt";
import { checkFile, saveAnalysis } from "./controllers/analysisController";

const router = express.Router();

router.post("/analyze", authJwt, checkFile);
router.post("/save", authJwt, saveAnalysis);

export default router;

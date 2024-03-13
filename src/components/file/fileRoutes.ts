import * as errors from "restify-errors";
import express from "express";
import upload from "./middlewares/multerConfig";
import { authJwt } from "../../middlewares/authJwt";
import {
  uploadFile,
  deleteUserFile
} from "./controllers/fileController";
import { generator } from "../../middlewares/generator";
import { FileRetrievalService } from "./services/fileRetrievalServices";

const fileRetrievalService = new FileRetrievalService();

const router = express.Router();

router.delete("/delete", authJwt, deleteUserFile);
router.post("/retrieval", authJwt, generator(fileRetrievalService.searchUserFiles, ["user"]));
router.post(
  "/upload",
  authJwt,
  upload.single("file"),
  (req, res, next) => {
    if (req.invalidFile) {
      return next(new errors.UnsupportedMediaTypeError(req.invalidFile));
    }
    next();
  },
  uploadFile
);

export default router;
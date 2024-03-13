import * as errors from "restify-errors";
import express from "express";
import upload from "./middlewares/multerConfig";
import { authJwt } from "../../middlewares/authJwt";
import { generator } from "../../middlewares/generator";
import { FileRetrievalService } from "./services/fileRetrievalServices";
import { FileManagementServices } from "./services/fileManagementServices";

const fileRetrievalService = new FileRetrievalService();
const fileManagementServices = new FileManagementServices();

const router = express.Router();

router.delete("/delete", authJwt, generator(fileManagementServices.deleteUserFile, ["body", "user"]));
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
  generator(fileManagementServices.uploadFile, ["file", "user"])
);

export default router;
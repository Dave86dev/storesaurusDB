import * as errors from "restify-errors";
import express from "express";
import upload from "../middlewares/multerConfig";
import { uploadFile, checkFile } from "./fileController";

const router = express.Router();

//Exceptional error-handling due to Multer non-compatibility with the way Express
//handles the errors.
router.post("/upload", upload.single("file"), (req, res, next) => {
    if (req.invalidFile) {
        return next(new errors.UnsupportedMediaTypeError(req.invalidFile));
    }
    next();
}, uploadFile);

router.post('/analysis', checkFile)

export default router;
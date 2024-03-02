import * as errors from "restify-errors";
import express from "express";
import upload from "./middlewares/multerConfig";
import { authJwt } from "../../middlewares/authJwt";
import { uploadFile, checkFile } from "./controllers/fileController";

const router = express.Router();

//Exceptional error-handling due to Multer non-compatibility with the way Express handles the errors.
router.post("/upload", authJwt, upload.single("file"), (req, res, next) => {
    if (req.invalidFile) {
        return next(new errors.UnsupportedMediaTypeError(req.invalidFile));
    }
    next();
}, uploadFile);

router.post('/analysis', authJwt, checkFile)

export default router;
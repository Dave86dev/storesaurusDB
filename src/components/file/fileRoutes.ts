import * as errors from "restify-errors";
import express from "express";
import upload from "./middlewares/multerConfig";
import { decodeJwt } from "../../middlewares/decodeJwt";
import { authorizeUser } from "../../middlewares/authorizeUser";
import { uploadFile, checkFile } from "./controllers/fileController";

const router = express.Router();

//Exceptional error-handling due to Multer non-compatibility with the way Express
//handles the errors.
router.post("/upload", decodeJwt, authorizeUser, upload.single("file"), (req, res, next) => {
    if (req.invalidFile) {
        return next(new errors.UnsupportedMediaTypeError(req.invalidFile));
    }
    next();
}, uploadFile);

router.post('/analysis', decodeJwt, authorizeUser, checkFile)

export default router;
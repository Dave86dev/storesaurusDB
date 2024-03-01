import multer, { FileFilterCallback } from "multer";
import { Request as CustomRequest } from "express";
const allowedTypes: string[] = ["text/csv"];

interface invalidFile extends CustomRequest {
  invalidFile?: string;
}

const fileFilter = (
  req: invalidFile,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.invalidFile = "Invalid file type";
    //bad news amigos...
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

export default upload;

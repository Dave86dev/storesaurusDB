import multer, { FileFilterCallback } from "multer";
import express from "express";

const allowedTypes: string[] = ["text/csv"];

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.invalidFile = "Invalid file type";
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

export default upload;

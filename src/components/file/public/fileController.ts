import GridFsService from "../services/gridFsSservices"
import { Request, Response } from "express";
import { getDb } from "../../../db";

let gridFsService: GridFsService;

export const uploadFile = async (req: Request, res: Response) => {

    gridFsService = new GridFsService(getDb())

    try {
  
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
  
      const fileId = await gridFsService.saveFile(req.file);
      res.json({ message: "File uploaded successfully", fileId });
  
    } catch (error) {
  
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading file." });
  
    }
};

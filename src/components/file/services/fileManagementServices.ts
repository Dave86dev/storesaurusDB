import * as errors from "restify-errors";
import { getDb } from "../../../db";
import { serviceAnswer } from "../../../interfaces";
import GridFsService from "../../../services/gridFsSservices";

let gridFsService: GridFsService;

export class FileManagementServices {
  async deleteUserFile(fileId: string): Promise<serviceAnswer> {
    try {
      gridFsService = new GridFsService(getDb());

      const result = await gridFsService.deleteFile(fileId);

      return {
        message: result.message,
      };
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    _id: string
  ): Promise<serviceAnswer> {
    try {
      gridFsService = new GridFsService(getDb());

      if (!file) {
        throw new errors.BadRequestError("No file uploaded.");
      }

      const uploadAnswer = await gridFsService.saveFile(file, _id);
      return { message: uploadAnswer.message, data: uploadAnswer.data };
    } catch (error) {
      throw error;
    }
  }
}

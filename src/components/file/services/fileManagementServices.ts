import * as errors from "restify-errors";
import { getDb } from "../../../db";
import { serviceAnswer, userReq, bodyReq } from "../../../interfaces";
import GridFsService from "../../../services/gridFsSservices";

let gridFsService: GridFsService;

export class FileManagementServices {
  async deleteUserFile(body: bodyReq): Promise<serviceAnswer> {
    gridFsService = new GridFsService(getDb());

    const result = await gridFsService.deleteFile(body.fileId);

    return {
      message: result.message,
    };
  }

  async uploadFile(
    file: Express.Multer.File,
    user: userReq
  ): Promise<serviceAnswer> {
    gridFsService = new GridFsService(getDb());

    if (!file) {
      throw new errors.BadRequestError("No file uploaded.");
    }

    const uploadAnswer = await gridFsService.saveFile(file, user._id);
    return { message: uploadAnswer.message, data: uploadAnswer.data };
  }
}

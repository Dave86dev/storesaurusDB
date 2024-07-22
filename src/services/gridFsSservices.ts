import * as errors from "restify-errors";
import { GridFSBucket, Db, ObjectId } from "mongodb";
import { PassThrough } from "stream";
import { fileData, serviceAnswer } from "../interfaces";

// import { Request } from 'express';

export default class GridFsService {
  private readonly bucket: GridFSBucket;

  constructor(db: Db) {
    this.bucket = new GridFSBucket(db, { bucketName: "Uploads_Collection" });
  }

  async deleteFile(fileId: string | undefined): Promise<serviceAnswer> {
    if (!fileId) {
      throw new errors.BadRequestError("VALIDATION_FAILED");
    }

    await this.bucket.delete(new ObjectId(fileId));

    return { message: "File successfully deleted" };
  }

  async getFile(
    fileId: string | undefined,
    userId: string
  ): Promise<serviceAnswer> {
    if (!fileId) {
      throw new errors.BadRequestError("VALIDATION_FAILED");
    }

    const files = await this.bucket
      .find({ _id: new ObjectId(fileId) })
      .toArray();

    if (files.length === 0) {
      throw new errors.NotFoundError("RESOURCE_NOT_FOUND");
    }

    const mimeType = files[0].metadata?.mimetype || "application/octet-stream";

    const owner = files[0].metadata?.userId;

    if (owner !== userId) {
      throw new errors.ForbiddenError(
        "RESOURCE_ACCESS_DENIED"
      );
    }

    const downloadStream = this.bucket.openDownloadStream(new ObjectId(fileId));
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      downloadStream.on("error", (error) => {
        reject(new errors.NotFoundError(error.message));
      });

      downloadStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on("end", () => {
        if (chunks.length === 0) {
          reject(new errors.NotFoundError("RESOURCE_NOT_FOUND"));
        } else {
          const fileBuffer = Buffer.concat(chunks);
          const content = fileBuffer.toString("utf8");
          resolve({
            data: {
              content: content,
              owner: owner,
              mimeType: mimeType,
            } as fileData,
          });
        }
      });
    });
  }

  async saveFile(
    file: Express.Multer.File,
    userId: string
  ): Promise<serviceAnswer> {
    return new Promise((resolve, reject) => {
      const options = {
        metadata: {
          mimetype: file.mimetype,
          userId: userId,
        },
      };

      const uploadStream = this.bucket.openUploadStream(
        file.originalname,
        options
      );

      const bufferStream = new PassThrough();
      bufferStream.end(file.buffer);
      bufferStream
        .pipe(uploadStream)
        .on("error", (error) =>
          reject(new errors.InternalServerError(error.message))
        )
        .on("finish", () =>
          resolve({ message: "File upload successfuly", data: uploadStream.id })
        );
    });
  }
}

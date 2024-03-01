import * as errors from "restify-errors";
import { GridFSBucket, Db, ObjectId } from "mongodb";
import { PassThrough } from "stream";

export default class GridFsService {
  private readonly bucket: GridFSBucket;

  constructor(db: Db) {
    this.bucket = new GridFSBucket(db, { bucketName: "uploads" });
  }

  async saveFile(file: Express.Multer.File): Promise<ObjectId> {
    return new Promise((resolve, reject) => {
      const options = {
        metadata: {
          mimetype: file.mimetype,
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
        .on("finish", () => resolve(uploadStream.id));
    });
  }

  async getFile(
    FileId: string
  ): Promise<{ content: string; mimeType: string }> {
    try {
      const files = await this.bucket
        .find({ _id: new ObjectId(FileId) })
        .toArray();

      if (files.length === 0) {
        throw new errors.NotFoundError("File not found.");
      }

      const mimeType =
        files[0].metadata?.mimetype || "application/octet-stream";

      const downloadStream = this.bucket.openDownloadStream(
        new ObjectId(FileId)
      );
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
            reject(new errors.NotFoundError("File not found or is empty"));
          } else {
            const fileBuffer = Buffer.concat(chunks);
            const content = fileBuffer.toString("utf8");
            resolve({ content, mimeType });
          }
        });
      });
    } catch (error) {
      throw new errors.NotFoundError('Error accessing file.');
    }
  }
}

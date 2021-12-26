/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, mongo } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Stream } from 'stream';
import { FastifyRequest } from 'fastify';
type Request = FastifyRequest;

@Injectable()
export class FileService {
  private readonly bucket: GridFSBucket;

  constructor(
    // @InjectModel(OFile.name) private readonly OFileModel: Model<OFile>,
    @InjectModel('fs.files') private readonly OFileModel: Model<any>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.bucket = new mongo.GridFSBucket(this.connection.db);
  }

  async upload({ request, file }: { request; file }) {
    // var fullUrl = 'https://file.remabackend.com';
    const fullUrl = 'http://' + request.hostname + '/v1';
    return new Promise(async (resolve, reject) => {
      try {
        request.multipart(
          (field, file: Stream, filename, encoding, mimetype) => {
            const uploadStream = this.bucket.openUploadStream('/' + filename, {
              contentType: mimetype,
            });
            // var fullUrl = 'https://file.remabackend.com';
            // var fullUrl =  'http://' + request.hostname ;

            file.on('end', () => {
              resolve({
                id: uploadStream.id?.toString(),
                path: fullUrl + '/File/' + uploadStream.id?.toString(),
                name: filename,
                mimetype: mimetype,
              });
            });

            file.pipe(uploadStream);
          },
          (err) => {
            reject(new BadRequestException('error while uploading'));
          },
        );
      } catch (e) {
        reject(new BadRequestException('error while uploading'));
      }
    });
  }

  async uploadMultiple({ request, file }: { request; file }) {
    // var fullUrl = 'https://file.remabackend.com';
    const fullUrl = 'http://' + request.hostname;
    return new Promise(async (resolve, reject) => {
      try {
        const parts = await request.parts();
        const files = [];
        for await (const part of parts) {
          if (part.file) {
            const uploadStream = this.bucket.openUploadStream(
              '/' + part.filename,
              {
                contentType: part.mimetype,
              },
            );
            // var fullUrl = 'https://file.remabackend.com';
            part.file.on('end', () => {
              files.push({
                id: uploadStream.id?.toString(),
                path: fullUrl + '/File/' + uploadStream.id?.toString(),
                name: part.filename,
                mimetype: part.mimetype,
              });
            });

            part.file.pipe(uploadStream);
          } else {
          }
        }
        resolve(files);
      } catch (e) {
        reject(new ServiceUnavailableException());
      }
    });
  }

  async download(id: string, request, response) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid File ID');
    }

    const oId = new ObjectId(id);
    // let x =

    // const fileInfo =  await this.bucket.find({_id: id})
    const fileInfo = await this.OFileModel.findOne({ _id: id }).exec();

    if (!fileInfo) {
      throw new NotFoundException('File Not Found');
    }

    if (request.headers.range) {
      const range = request?.headers?.range?.substr(6)?.split('-');
      const start = parseInt(range[0], 10);
      const end = parseInt(range[1], 10) || null;
      const readstream = this.bucket?.openDownloadStream(oId, {
        start,
        end,
      });

      response.status(206);
      response.headers({
        'Accept-Ranges': 'bytes',
        'Content-Type': fileInfo?.contentType,
        'Content-Range': `bytes ${start}-${end ? end : fileInfo?.length - 1}/${
          fileInfo?.length
        }`,
        'Content-Length': (end ? end : fileInfo?.length) - start,
        // 'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
      });

      response?.raw?.on('close', () => {
        readstream.destroy();
      });

      response.send(readstream);
    } else {
      const readstream = this.bucket.openDownloadStream(oId);

      response.raw.on('close', () => {
        readstream.destroy();
      });

      response.status(200);
      response.headers({
        'Accept-Range': 'bytes',
        'Content-Type': fileInfo.contentType,
        'Content-Length': fileInfo.length,
        'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
      });

      response.send(readstream);
    }
  }
}

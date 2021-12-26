import { FileService } from './file.service';
import { FastifyRequest } from 'fastify';
declare type Request = FastifyRequest;
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(req: Request, file: any): Promise<unknown>;
    uploadMultipleFiles(req: Request, files: any[]): Promise<unknown>;
    downloadFile(id: string, request: any, response: any): Promise<void>;
}
export {};

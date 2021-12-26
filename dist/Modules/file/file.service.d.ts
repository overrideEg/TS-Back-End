import { Connection, Model } from 'mongoose';
export declare class FileService {
    private readonly OFileModel;
    private readonly connection;
    private readonly bucket;
    constructor(OFileModel: Model<any>, connection: Connection);
    upload({ request, file }: {
        request: any;
        file: any;
    }): Promise<unknown>;
    uploadMultiple({ request, file }: {
        request: any;
        file: any;
    }): Promise<unknown>;
    download(id: string, request: any, response: any): Promise<void>;
}

import { Document } from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
export declare type OFileDocument = OFile & Document;
export declare class OFile extends OBaseEntity {
    name: string;
    length: number;
    chunkSize: number;
    uploadDate: string;
    filename: string;
    md5: string;
    contentType: string;
}
export declare const OFileSchema: import("mongoose").Schema<Document<OFile, any, any>, import("mongoose").Model<Document<OFile, any, any>, any, any, any>, any>;

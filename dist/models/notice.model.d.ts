import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { User } from './user.model';
export declare type NoticeDocument = Notice & Document;
export declare class Notice extends OBaseEntity {
    valueDate?: number;
    user?: User;
    title: string;
    body: string;
    entityType: string;
    entityId: string;
}
export declare const NoticeSchema: mongoose.Schema<Document<Notice, any, any>, mongoose.Model<Document<Notice, any, any>, any, any, any>, any>;

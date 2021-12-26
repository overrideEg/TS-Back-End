import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export declare type SubjectDocument = Subject & Document;
export declare class Subject extends OBaseEntity {
    name: Localized;
    image?: string;
}
export declare const SubjectSchema: mongoose.Schema<Document<Subject, any, any>, mongoose.Model<Document<Subject, any, any>, any, any, any>, any>;

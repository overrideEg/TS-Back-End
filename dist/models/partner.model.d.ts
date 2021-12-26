import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
export declare type PartnerDocument = Partner & Document;
export declare class Partner extends OBaseEntity {
    name?: string;
    logo?: string;
}
export declare const PartnerSchema: mongoose.Schema<Document<Partner, any, any>, mongoose.Model<Document<Partner, any, any>, any, any, any>, any>;

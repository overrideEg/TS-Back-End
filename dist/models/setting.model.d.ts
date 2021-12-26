import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export declare type SettingDocument = Setting & Document;
export declare class Setting extends OBaseEntity {
    about?: Localized;
    terms?: Localized;
    privacy?: Localized;
    facebook?: string;
    twitter?: string;
    snapchat?: string;
    instagram?: string;
    whatsapp?: string;
    phoneNumber?: string;
}
export declare const SettingSchema: mongoose.Schema<Document<Setting, any, any>, mongoose.Model<Document<Setting, any, any>, any, any, any>, any>;

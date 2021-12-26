import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export declare type BannerDocument = Banner & Document;
export declare class Banner extends OBaseEntity {
    title: Localized;
    priority: number;
    image: string;
}
export declare const BannerSchema: mongoose.Schema<Document<Banner, any, any>, mongoose.Model<Document<Banner, any, any>, any, any, any>, any>;

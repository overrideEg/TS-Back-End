import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
export declare type PromotionDocument = Promotion & Document;
export declare class Promotion extends OBaseEntity {
    code: string;
    fromDate: number;
    toDate: number;
    discountPercent: number;
    useOnce: boolean;
}
export declare const PromotionSchema: mongoose.Schema<Document<Promotion, any, any>, mongoose.Model<Document<Promotion, any, any>, any, any, any>, any>;

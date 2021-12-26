import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
export declare type PricingDocument = Pricing & Document;
export declare class Pricing extends OBaseEntity {
    _id?: any;
    createdAt?: number;
    updatedAt?: string;
    sessionAppleId?: string;
    sessionApplePrice?: number;
    sessionAndroidId?: string;
    sessionAndroidPrice?: number;
    sessionWebPrice?: number;
    tutorialAppleId?: string;
    tutorialApplePrice?: number;
    tutorialAndroidId?: string;
    tutorialAndroidPrice?: number;
    tutorialWebPrice?: number;
}
export declare const PricingSchema: mongoose.Schema<Document<Pricing, any, any>, mongoose.Model<Document<Pricing, any, any>, any, any, any>, any>;

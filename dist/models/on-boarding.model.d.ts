import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export declare type OnBoardingDocument = OnBoarding & Document;
export declare class OnBoarding extends OBaseEntity {
    title: Localized;
    priority: number;
    image: string;
}
export declare const OnBoardingSchema: mongoose.Schema<Document<OnBoarding, any, any>, mongoose.Model<Document<OnBoarding, any, any>, any, any, any>, any>;

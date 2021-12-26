import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export declare type StageDocument = Stage & Document;
export declare class Stage extends OBaseEntity {
    name: Localized;
    stageNumber: number;
}
export declare const StageSchema: mongoose.Schema<Document<Stage, any, any>, mongoose.Model<Document<Stage, any, any>, any, any, any>, any>;

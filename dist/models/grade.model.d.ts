import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
import { Stage } from './stage.model';
export declare type GradeDocument = Grade & Document;
export declare class Grade extends OBaseEntity {
    name: Localized;
    gradeNumber: number;
    stage?: Stage;
}
export declare const GradeSchema: mongoose.Schema<Document<Grade, any, any>, mongoose.Model<Document<Grade, any, any>, any, any, any>, any>;

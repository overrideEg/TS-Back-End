import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { LessonType } from '../../../enums/lesson-type.enum';
import { Excercice } from './excercice.model';
import { OFile } from '../../../Modules/file/entities/file.entity';
export declare type LessonDocument = Lesson & Document;
export declare class Lesson extends OBaseEntity {
    name: string;
    type: LessonType;
    attachement?: OFile;
    excercices?: Excercice[];
    isDone: boolean;
}
export declare const LessonSchema: mongoose.Schema<Document<Lesson, any, any>, mongoose.Model<Document<Lesson, any, any>, any, any, any>, any>;

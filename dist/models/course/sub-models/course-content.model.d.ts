import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { Lesson } from './lesson.model';
export declare type CourseContentDocument = CourseContent & Document;
export declare class CourseContent extends OBaseEntity {
    chapter: string;
    lessons?: Lesson[];
}
export declare const CourseContentSchema: mongoose.Schema<Document<CourseContent, any, any>, mongoose.Model<Document<CourseContent, any, any>, any, any, any>, any>;

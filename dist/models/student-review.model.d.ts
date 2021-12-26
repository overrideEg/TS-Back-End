import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Course } from './course/course.model';
export declare type StudentReviewDocument = StudentReview & Document;
export declare class StudentReview extends OBaseEntity {
    course: Course;
    valueDate?: number;
    attendance: boolean;
    grades?: number;
    performance?: number;
    understanding?: number;
}
export declare const StudentReviewSchema: mongoose.Schema<Document<StudentReview, any, any>, mongoose.Model<Document<StudentReview, any, any>, any, any, any>, any>;

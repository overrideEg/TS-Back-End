import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Course } from './course/course.model';
import { User } from './user.model';
import { Lesson } from './course/sub-models/lesson.model';
export declare class AttendanceLog {
    user?: User;
    time?: number;
}
export declare class ChatMessage {
    user?: User;
    time?: number;
    message?: string;
}
export declare type LearningClassDocument = LearningClass & Document;
export declare class LearningClass extends OBaseEntity {
    course?: Course;
    lesson?: Lesson;
    startTime?: number;
    endTime?: number;
    attenders: number;
    teacherToken?: string;
    studentToken?: string;
    attendanceLogs?: AttendanceLog[];
    chat?: ChatMessage[];
}
export declare const LearningClassSchema: mongoose.Schema<Document<LearningClass, any, any>, mongoose.Model<Document<LearningClass, any, any>, any, any, any>, any>;

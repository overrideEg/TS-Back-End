import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { User } from '../../user.model';
export declare type CourseReviewDocument = CourseReview & Document;
export declare class CourseReview extends OBaseEntity {
    user?: User;
    comment?: string;
    stars?: number;
}
export declare const CourseReviewSchema: mongoose.Schema<Document<CourseReview, any, any>, mongoose.Model<Document<CourseReview, any, any>, any, any, any>, any>;

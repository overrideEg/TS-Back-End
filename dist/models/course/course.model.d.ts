import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Grade } from '../grade.model';
import { Day } from '../../shared/enums/day.enum';
import { Subject } from '../subject.model';
import { User } from '../user.model';
import { Localized } from '../../shared/localized';
import { CourseReview } from './sub-models/course-review.model';
import { CourseType } from '../../enums/course-type.enum';
import { OFile } from '../../Modules/file/entities/file.entity';
import { Status } from '../../enums/status.enum';
import { Excercice } from './sub-models/excercice.model';
export declare const random: (min: any, max: any) => any;
export declare type CourseDocument = Course & Document;
export declare class Course {
    _id?: any;
    createdAt?: number;
    updatedAt?: string;
    status: Status;
    type?: CourseType;
    cover?: Localized;
    name?: Localized;
    info?: Localized;
    startDate?: number;
    description?: Localized;
    grade?: Grade;
    subject?: Subject;
    price?: number;
    reviews?: CourseReview[];
    teacher?: User;
    days?: Day[];
    hour?: number;
    attachements?: OFile[];
    excercices?: Excercice[];
}
export declare const CourseSchema: mongoose.Schema<Document<Course, any, any>, mongoose.Model<Document<Course, any, any>, any, any, any>, any>;

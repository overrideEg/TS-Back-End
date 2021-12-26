import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Lang } from '../shared/enums/lang.enum';
import { Course } from './course/course.model';
import { City } from './city.model';
import { Grade } from './grade.model';
import { Stage } from './stage.model';
import { StudentReview } from './student-review.model';
import { BankAccount } from './bank-account.model';
import { Wallet } from './wallet-model';
export declare enum UserType {
    admin = "Admin",
    student = "Student",
    teacher = "Teacher",
    parent = "Parent"
}
export declare type UserDocument = User & Document;
export declare class User extends OBaseEntity {
    name?: string;
    email?: string;
    isActive?: boolean;
    teacherApproved?: boolean;
    phone?: string;
    password?: string;
    avatar?: string;
    defaultLang?: Lang;
    tempCode?: string;
    userType?: UserType;
    cart?: Course[];
    city?: City;
    studentId: string;
    stage?: Stage;
    grade?: Grade;
    studentReviews?: StudentReview[];
    additionalPhone?: string;
    resume?: string;
    coverletter?: string;
    bio?: string;
    cRating?: number;
    wallet?: Wallet[];
    bankAccounts?: BankAccount[];
    students?: User[];
}
export declare const UserSchema: mongoose.Schema<Document<User, any, any>, mongoose.Model<Document<User, any, any>, any, any, any>, any>;

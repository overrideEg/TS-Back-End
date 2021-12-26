import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Course } from './course/course.model';
import { PaymentMethod, PaymentStatus } from '../enums/payment-method.enum';
import { User } from './user.model';
export declare type CheckoutDocument = Checkout & Document;
export declare class Checkout extends OBaseEntity {
    user?: User;
    valueDate?: number;
    promoCode?: string;
    course: Course;
    price?: number;
    paymentMethod?: PaymentMethod;
    paymentStatus?: PaymentStatus;
    paymentResult?: any;
    paymentId?: string;
    priceBeforeDiscount?: number;
    discount?: number;
    priceAfterDiscount?: number;
}
export declare const CheckoutSchema: mongoose.Schema<Document<Checkout, any, any>, mongoose.Model<Document<Checkout, any, any>, any, any, any>, any>;

import { PaymentMethod } from '../enums/payment-method.enum';
import { Course } from '../models/course/course.model';
export declare class CheckoutDTO {
    promoCode?: string;
    purchasedFor: string;
    courses: Course[];
    paymentMethod?: PaymentMethod;
    paymentReffrence: string;
    paidValue: number;
}

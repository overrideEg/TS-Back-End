import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "../enums/payment-method.enum";
import { Course } from "../Models/course.model";


export class CheckoutDTO {

    @ApiProperty({ description: 'promoCode', required: false })
    promoCode?: string;

    @ApiProperty({ type: () => Course, isArray: true, required: true })
    courses: Course[];

    @ApiProperty({ description: 'PaymentMethod', default: PaymentMethod.creditCard, required: true })
    paymentMethod?: PaymentMethod;




}
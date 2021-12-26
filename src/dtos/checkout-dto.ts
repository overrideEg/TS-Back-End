import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "../enums/payment-method.enum";
import { Course } from "../models/course/course.model";


export class CheckoutDTO {

    @ApiProperty({ description: 'promoCode', required: false })
    promoCode?: string;

    @ApiProperty()
    purchasedFor : string

    @ApiProperty({ type: () => Course, isArray: true, required: true })
    courses: Course[];

    @ApiProperty({  enum: [PaymentMethod.VISA,PaymentMethod.MADA,PaymentMethod.MASTER], required: true })
    paymentMethod?: PaymentMethod;





}
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "../enums/payment-method.enum";
import { Course } from "../Models/course.model";


export class CheckoutDTO {

    @ApiProperty({ description: 'promoCode', required: false })
    promoCode?: string;

    @ApiProperty()
    purchasedFor : string

    @ApiProperty({ type: () => Course, isArray: true, required: true })
    courses: Course[];

    @ApiProperty({  enum: [PaymentMethod.VISA,PaymentMethod.MADA,PaymentMethod.MASTER], required: true })
    paymentMethod?: PaymentMethod;

    @ApiProperty({ required: true })
    cardNumber?: string;

    @ApiProperty({required: true })
    expireMonth?: string;

    @ApiProperty({required: true })
    expireYear?: string;
    
    @ApiProperty({required: true })
    holder?: string;

    @ApiProperty({required: true })
    cvv?: string;




}
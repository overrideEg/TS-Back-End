import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course.model';
import { PaymentMethod } from '../enums/payment-method.enum';
import { User } from './user.model';

export class CheckoutLine {
    @ApiProperty({ type: () => Course, isArray: false, required: true })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' , autopopulate: true})
    course: Course;

    @ApiProperty({ description: 'price', required: true })
    @Prop({
        default: 0
    })
    price?: number;
}
export type CheckoutDocument = Checkout & Document;
@Schema()
export class Checkout extends OBaseEntity {
    @ApiProperty({ type: () => User })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    user?: User;
    
    @ApiProperty({ description: 'valueDate', required: true })
    @Prop({ default: Date.now() })
    valueDate?: number;

    @ApiProperty({ description: 'promoCode', required: false })
    @Prop()
    promoCode?: string;

    @ApiProperty({ type: () => CheckoutLine, isArray: true, description: 'lines', required: true })
    @Prop([CheckoutLine])
    lines?: CheckoutLine[];

    @ApiProperty({ description: 'PaymentMethod', default: PaymentMethod.creditCard, required: true })
    @Prop({ enum: [PaymentMethod.creditCard], default: PaymentMethod.creditCard })
    paymentMethod?: PaymentMethod;

    @ApiProperty({ description: 'price Before Discount' })
    @Prop()
    priceBeforeDiscount?: number;

    @ApiProperty({ description: 'discount', required: true })
    @Prop({ default: 0 })
    discount?: number;

    @ApiProperty({ description: 'price After Discount', required: true })
    @Prop({
        default: function () {
            return this.priceBeforeDiscount - this.discount;
        }
    })
    priceAfterDiscount?: number;


}
export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
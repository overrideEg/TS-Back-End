import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course/course.model';
import { PaymentMethod, PaymentStatus } from '../enums/payment-method.enum';
import { User } from './user.model';

export type CheckoutDocument = Checkout & Document;
@Schema()
export class Checkout extends OBaseEntity {
  @ApiProperty({ type: () => User })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  user?: User;

  @ApiProperty({ description: 'valueDate', required: true })
  @Prop({ default: Date.now() })
  valueDate?: number;

  @ApiProperty({ description: 'promoCode', required: false })
  @Prop()
  promoCode?: string;

  @ApiProperty({ type: () => Course, isArray: false, required: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    autopopulate: true,
  })
  course: Course;

  @ApiProperty({ description: 'price', required: true })
  @Prop({ default: 0 })
  price?: number;

  @ApiProperty({ description: 'PaymentMethod', required: true })
  @Prop({
    enum: [
      PaymentMethod.VISA,
      PaymentMethod.MADA,
      PaymentMethod.MASTER,
      PaymentMethod.APPLE,
      PaymentMethod.ANDROID,
    ],
  })
  paymentMethod?: PaymentMethod;

  @ApiProperty({
    enum: [PaymentStatus.Paid, PaymentStatus.Wait],
    required: true,
  })
  @Prop({
    enum: [PaymentStatus.Paid, PaymentStatus.Wait],
    default: PaymentStatus.Wait,
  })
  paymentStatus?: PaymentStatus;

  @ApiProperty({ description: 'redirect', required: true })
  @Prop({ type: mongoose.Schema.Types.Mixed })
  paymentResult?: any;

  @ApiProperty({ description: 'paymentCode', required: true })
  @Prop()
  paymentId?: string;

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
    },
  })
  priceAfterDiscount?: number;
}
export const CheckoutSchema = SchemaFactory.createForClass(Checkout);

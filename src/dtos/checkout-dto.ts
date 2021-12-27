import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Course } from '../database-models/course/course.model';

export class CheckoutDTO {
  @ApiProperty({ description: 'promoCode', required: false })
  promoCode?: string;

  @ApiProperty()
  purchasedFor: string;

  @ApiProperty({ type: () => Course, isArray: true, required: true })
  courses: Course[];

  @ApiProperty({
    enum: [
      PaymentMethod.VISA,
      PaymentMethod.MADA,
      PaymentMethod.MASTER,
      PaymentMethod.APPLE,
      PaymentMethod.ANDROID,
    ],
    required: true,
  })
  paymentMethod?: PaymentMethod;

  @ApiProperty({ required: false })
  paymentReffrence: string;

  @ApiProperty({ required: false })
  paidValue: number;
}

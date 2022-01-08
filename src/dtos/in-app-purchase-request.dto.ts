import { ApiProperty } from "@nestjs/swagger"
import { PaymentMethod } from "../enums/payment-method.enum"

export class InAppPurchaseRequest{

    @ApiProperty({enum:[PaymentMethod.ANDROID, PaymentMethod.APPLE]})
    appType: PaymentMethod;

    @ApiProperty()
    courseId: string;

    @ApiProperty()
    productId: string;

    @ApiProperty()
    orderToken: string;

    @ApiProperty()
    purchasedFor: string;
}


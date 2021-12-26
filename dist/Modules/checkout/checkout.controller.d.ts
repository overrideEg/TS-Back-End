import { CheckoutDTO } from '../../dtos/checkout-dto';
import { Checkout } from '../../models/checkout.model';
import { CheckoutService } from './checkout.service';
export declare class CheckoutController {
    private service;
    constructor(service: CheckoutService);
    checkAndPay(req: any, body: CheckoutDTO): Promise<Checkout[]>;
    payment(req: any, id: string, paymentMethod: string): {
        id: string;
        resultUrl: string;
    };
    authorize(paymentMethod: string, id: string, resourcePath: string): void;
}

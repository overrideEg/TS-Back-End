import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { Checkout, CheckoutDocument } from '../../models/checkout.model';
import { CourseService } from '../course/course.service';
import { NoticeService } from '../notice/notice.service';
import { PromotionService } from '../promotion/promotion.service';
import { UserService } from '../user/user.service';
import { HttpService } from '@nestjs/axios';
import { PricingService } from '../pricing/pricing.service';
import { Course } from '../../models/course/course.model';
import { Pricing } from '../../models/pricing.model';
export declare class CheckoutService {
    CheckoutModel: Model<CheckoutDocument>;
    private courseService;
    private userService;
    private promotionService;
    private noticeService;
    private httpService;
    private pricingService;
    constructor(CheckoutModel: Model<CheckoutDocument>, courseService: CourseService, userService: UserService, promotionService: PromotionService, noticeService: NoticeService, httpService: HttpService, pricingService: PricingService);
    private readonly log;
    save(req: Checkout): Promise<Checkout & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    checkAndPay(req: any, body: CheckoutDTO): Promise<Checkout[] | PromiseLike<any>>;
    calculatePrice(course: Course, pricing: Pricing, paymentMethod: PaymentMethod): number;
    authorize(paymentMethod: string, id: string, path: string): Promise<any>;
}

import { Model } from 'mongoose';
import { Promotion, PromotionDocument } from '../../models/promotion.model';
import { CheckoutService } from '../checkout/checkout.service';
export declare class PromotionService {
    PromotionModel: Model<PromotionDocument>;
    private checkoutService;
    constructor(PromotionModel: Model<PromotionDocument>, checkoutService: CheckoutService);
    save(req: Promotion): Promise<Promotion & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getPromotionByCode(code: string): Promise<Promotion>;
    findAll(): Promise<Promotion[]>;
    findOne(id: string): Promise<Promotion>;
    update(id: string, req: Promotion): Promise<Promotion>;
    remove(id: string): Promise<Promotion>;
}

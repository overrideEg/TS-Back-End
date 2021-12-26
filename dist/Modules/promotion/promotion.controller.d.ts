import { Promotion } from '../../models/promotion.model';
import { PromotionService } from './promotion.service';
export declare class PromotionController {
    private service;
    constructor(service: PromotionService);
    savePromotion(req: Promotion): Promise<Promotion>;
    getAllPromotions(): Promise<Promotion[]>;
    getPromotionByCode(code: string): Promise<Promotion>;
    findOne(id: string): Promise<Promotion>;
    updatePromotion(id: string, req: Promotion): Promise<any>;
    deletePromotion(id: string): Promise<any>;
}

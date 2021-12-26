import { Model } from 'mongoose';
import { Pricing, PricingDocument } from '../../models/pricing.model';
export declare class PricingService {
    private PricingModel;
    constructor(PricingModel: Model<PricingDocument>);
    save(req: Pricing): Promise<Pricing>;
    getCurrentPricings(): Promise<Pricing>;
    findOne(id: string): Promise<Pricing>;
    update(id: string, req: Pricing): Promise<Pricing>;
}

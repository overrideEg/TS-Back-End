import { Pricing } from '../../models/pricing.model';
import { PricingService } from './pricing.service';
export declare class PricingController {
    private service;
    constructor(service: PricingService);
    saveHome(req: Pricing): Promise<Pricing>;
    getHome(): Promise<Pricing>;
}

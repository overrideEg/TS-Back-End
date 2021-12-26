import { Banner } from '../../models/banner.model';
import { BannerService } from './banner.service';
export declare class BannerController {
    private service;
    constructor(service: BannerService);
    saveBanner(req: Banner): Promise<Banner>;
    getAllBanners(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    updateBanner(id: string, req: Banner): Promise<any>;
    deleteBanner(id: string): Promise<any>;
}

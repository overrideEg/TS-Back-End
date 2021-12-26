import { Model } from 'mongoose';
import { Banner, BannerDocument } from '../../models/banner.model';
export declare class BannerService {
    private BannerModel;
    constructor(BannerModel: Model<BannerDocument>);
    save(req: Banner): Promise<Banner & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Banner[]>;
    findOne(id: string): Promise<Banner>;
    update(id: string, req: Banner): Promise<Banner>;
    remove(id: string): Promise<Banner>;
}

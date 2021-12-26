import { Model } from 'mongoose';
import { Partner, PartnerDocument } from '../../models/partner.model';
export declare class PartnerService {
    private PartnerModel;
    constructor(PartnerModel: Model<PartnerDocument>);
    private readonly log;
    save(req: Partner): Promise<Partner & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Partner[]>;
    findOne(id: string): Promise<Partner>;
    update(id: string, req: Partner): Promise<Partner>;
    remove(id: string): Promise<Partner>;
}

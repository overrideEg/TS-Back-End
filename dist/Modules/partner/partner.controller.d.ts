import { Partner } from '../../models/partner.model';
import { PartnerService } from './partner.service';
export declare class PartnerController {
    private service;
    constructor(service: PartnerService);
    savePartner(req: Partner): Promise<Partner>;
    getAllPartners(): Promise<Partner[]>;
    findOne(id: string): Promise<Partner>;
    updatePartner(id: string, req: Partner): Promise<any>;
    deletePartner(id: string): Promise<any>;
}

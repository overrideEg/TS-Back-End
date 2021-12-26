import { ContactUs } from '../../models/contact-us.model';
import { ContactUsService } from './contact-us.service';
export declare class ContactUsController {
    private service;
    constructor(service: ContactUsService);
    saveContactUs(req: ContactUs): Promise<ContactUs>;
    getAllContactUss(): Promise<ContactUs[]>;
    findOne(id: string): Promise<ContactUs>;
    updateContactUs(id: string, req: ContactUs): Promise<any>;
    deleteContactUs(id: string): Promise<any>;
}

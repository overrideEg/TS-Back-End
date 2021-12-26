import { Model } from 'mongoose';
import { ContactUs, ContactUsDocument } from '../../models/contact-us.model';
export declare class ContactUsService {
    private ContactUsModel;
    constructor(ContactUsModel: Model<ContactUsDocument>);
    save(req: ContactUs): Promise<ContactUs & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<ContactUs[]>;
    findOne(id: string): Promise<ContactUs>;
    update(id: string, req: ContactUs): Promise<ContactUs>;
    remove(id: string): Promise<ContactUs>;
}

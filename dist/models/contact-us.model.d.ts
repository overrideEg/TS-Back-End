import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
export declare type ContactUsDocument = ContactUs & Document;
export declare class ContactUs extends OBaseEntity {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}
export declare const ContactUsSchema: mongoose.Schema<Document<ContactUs, any, any>, mongoose.Model<Document<ContactUs, any, any>, any, any, any>, any>;

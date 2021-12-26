import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
export declare type BankAccountDocument = BankAccount & Document;
export declare class BankAccount extends OBaseEntity {
    accountNumber: string;
    bankName: string;
    accountHolderName: string;
}
export declare const BankAccountSchema: mongoose.Schema<Document<BankAccount, any, any>, mongoose.Model<Document<BankAccount, any, any>, any, any, any>, any>;

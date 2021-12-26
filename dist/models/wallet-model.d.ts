import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { TransactionType } from '../enums/wallet.enum';
import { BankAccount } from './bank-account.model';
import { Checkout } from './checkout.model';
import { Course } from './course/course.model';
import { Status } from '../enums/status.enum';
export declare type WalletDocument = Wallet & Document;
export declare class Wallet extends OBaseEntity {
    date: number;
    value: number;
    type: TransactionType;
    status: Status;
    checkout?: Checkout;
    course?: Course;
    account?: BankAccount;
}
export declare const WalletSchema: mongoose.Schema<Document<Wallet, any, any>, mongoose.Model<Document<Wallet, any, any>, any, any, any>, any>;

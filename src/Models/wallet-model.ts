import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../enums/wallet.enum';
import { BankAccount } from './bank-account.model';
import { Checkout } from './checkout.model';
import { Course } from './course.model';
export type WalletDocument = Wallet & Document;
@Schema()
export class Wallet extends OBaseEntity {
   
    @ApiProperty()
    @Prop()
    date: number;
    @ApiProperty()
    @Prop()
    value: number;
    @ApiProperty({ enum: [TransactionType.in, TransactionType.out] })
    @Prop({ enum: [TransactionType.in, TransactionType.out] })
    type: TransactionType;
    @ApiProperty({ enum: [TransactionStatus.pending, TransactionStatus.approved] })
    @Prop({ enum: [TransactionStatus.pending, TransactionStatus.approved] })
    status: TransactionStatus
   
    @ApiProperty({ type: () => Checkout })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Checkout.name})
    checkout?: Checkout;

    @ApiProperty({ type: () => Course })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course'})
    course?: Course;

    @ApiProperty({ type: () => BankAccount })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BankAccount.name , autopopulate:true})
    account?: BankAccount;
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);
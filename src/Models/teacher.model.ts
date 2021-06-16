import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { City } from './city.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { TransactionStatus, TransactionType } from '../enums/wallet.enum';
import { Course } from './course.model';


export class BankAccount {
    @ApiProperty({ readOnly: true })
    @Prop()
    oId: string;
    @ApiProperty()
    @Prop()
    accountNumber: string;
    @ApiProperty()
    @Prop()
    bankName: string;
    @ApiProperty()
    @Prop()
    accountHolderName: string;
}
export class Wallet {
    @ApiProperty({ readOnly: true })
    @Prop()
    oId: string;
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
    @ApiProperty()
    @Prop()
    checkoutId: string;
    @ApiProperty({ type: () => Course, isArray: false, required: true })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', autopopulate: true })
    course: Course;
    @ApiProperty({ type: () => BankAccount, isArray: false, required: true })
    @Prop({ type: BankAccount })
    account: BankAccount;
}

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher extends OBaseEntity {
    @ApiProperty({ type: () => City })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name, autopopulate: true })
    city?: City;
    @ApiProperty()
    @Prop()
    additionalPhone?: string;
    @ApiProperty()
    @Prop()
    resume?: string
    @ApiProperty()
    @Prop()
    coverletter?: string
    @ApiProperty()
    @Prop()
    bio?: string
    @ApiProperty({ type: () => User })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate : { select : 'name' } })
    user?: User;

    @ApiProperty({ type: Wallet, isArray: true })
    @Prop([Wallet])
    wallet?: Wallet[];

    @ApiProperty({ type: BankAccount, isArray: true })
    @Prop([BankAccount])
    bankAccounts?: BankAccount[]
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
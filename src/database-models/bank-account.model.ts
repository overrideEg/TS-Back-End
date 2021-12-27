import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
export type BankAccountDocument = BankAccount & Document;
@Schema()
export class BankAccount extends OBaseEntity {
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
export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);

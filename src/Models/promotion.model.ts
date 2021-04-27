import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
export type PromotionDocument = Promotion & Document;
@Schema()
export class Promotion extends OBaseEntity {
    @ApiProperty()
    @Prop()
    code: string;
    @ApiProperty()
    @Prop()
    fromDate: number;
    @ApiProperty()
    @Prop()
    toDate: number;
    @ApiProperty()
    @Prop()
    useOnce: boolean;
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
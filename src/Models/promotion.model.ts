import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';
export type PromotionDocument = Promotion & Document;
@Schema()
export class Promotion extends OBaseEntity {
    @ApiProperty()
    @Prop()
    @IsString()
    @MinLength(6)
    code: string;
    @ApiProperty()
    @Prop()
    @IsNumber()
    fromDate: number;
    @ApiProperty()
    @Prop()
    @IsNumber()
    toDate: number;
    @ApiProperty()
    @Prop()
    @IsBoolean()
    useOnce: boolean;
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
export type PartnerDocument = Partner & Document;
@Schema()
export class Partner extends OBaseEntity {
    @ApiProperty({ description: 'name', required: true })
    @Prop()
    name?: string;


    @ApiProperty({description: 'logo', required: true })
    @Prop()
    logo?: string;
}
export const PartnerSchema = SchemaFactory.createForClass(Partner);
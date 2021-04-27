import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Localized } from '../shared/localized';
import { LocationModel } from '../shared/location.model';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';

export type CityDocument = City & Document;
@Schema()
export class City extends OBaseEntity {
    @ApiProperty({type:()=>Localized})
    @Prop({type:()=>Localized})
    name: Localized;
    @ApiProperty({type:()=>LocationModel})
    @Prop({type:()=>LocationModel})
    loc: LocationModel
}
export const CitySchema = SchemaFactory.createForClass(City);
CitySchema.index({loc: '2dsphere'});
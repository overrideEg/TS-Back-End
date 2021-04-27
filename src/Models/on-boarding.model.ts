
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Localized } from '../shared/localized';
export type OnBoardingDocument = OnBoarding & Document;
@Schema()
export class OnBoarding extends OBaseEntity {
    @ApiProperty({ type: () => Localized })
    @Prop({ type: () => Localized })
    title: Localized;
    @ApiProperty()
    @Prop()
    priority: number;
    @ApiProperty()
    @Prop()
    image: string;
}
export const OnBoardingSchema = SchemaFactory.createForClass(OnBoarding);
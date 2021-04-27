import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
export type BannerDocument = Banner & Document;
@Schema()
export class Banner extends OBaseEntity {
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
export const BannerSchema = SchemaFactory.createForClass(Banner);
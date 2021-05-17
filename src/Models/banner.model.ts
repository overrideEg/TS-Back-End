import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export type BannerDocument = Banner & Document;
@Schema()
export class Banner extends OBaseEntity {
    @ApiProperty({ type: () => Localized })
    @Prop({ type: () => Localized })
    @ValidateNested()
    @Type(()=>Localized)
    title: Localized;
    @ApiProperty()
    @Prop()
    @IsNumber()
    priority: number;
    @ApiProperty()
    @Prop()
    @IsString()
    image: string;
    
}
export const BannerSchema = SchemaFactory.createForClass(Banner);
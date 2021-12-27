import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Localized } from '../shared/localized';
export type SettingDocument = Setting & Document;
@Schema()
export class Setting extends OBaseEntity {
  @ApiProperty({ type: Localized, description: 'about', required: true })
  @Prop({ type: Localized })
  about?: Localized;

  @ApiProperty({ type: Localized, description: 'terms', required: true })
  @Prop({ type: Localized })
  terms?: Localized;

  @ApiProperty({ type: Localized, description: 'privacy', required: true })
  @Prop({ type: Localized })
  privacy?: Localized;

  @ApiProperty({ default: '', description: 'facebook', required: true })
  @Prop({ default: '' })
  facebook?: string;

  @ApiProperty({ default: '', description: 'twitter', required: true })
  @Prop({ default: '' })
  twitter?: string;

  @ApiProperty({ default: '', description: 'snapchat', required: true })
  @Prop({ default: '' })
  snapchat?: string;

  @ApiProperty({ default: '', description: 'instagram', required: true })
  @Prop({ default: '' })
  instagram?: string;

  @ApiProperty({ default: '', description: 'whatsapp', required: true })
  @Prop({ default: '' })
  whatsapp?: string;

  @ApiProperty({ default: '', description: 'phone number', required: true })
  @Prop({ default: '' })
  phoneNumber?: string;
}
export const SettingSchema = SchemaFactory.createForClass(Setting);

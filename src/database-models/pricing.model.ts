import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from '../enums/course-type.enum';
export type PricingDocument = Pricing & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  skipVersioning: true,
})
export class Pricing extends OBaseEntity {
  @ApiProperty({ type: String })
  _id?: any;

  @ApiProperty({ description: 'createdAt', required: true })
  @Prop({})
  createdAt?: number;

  @ApiProperty({ description: 'updatedAt', required: true })
  @Prop({})
  updatedAt?: number;

  @ApiProperty({ description: 'sessionAppleId', required: true })
  @Prop()
  sessionAppleId?: string;

  @ApiProperty({ description: 'sessionApplePrice', required: true })
  @Prop()
  sessionApplePrice?: number;

  @ApiProperty({ description: 'sessionAndroidId', required: true })
  @Prop()
  sessionAndroidId?: string;

  @ApiProperty({ description: 'sessionAndroidPrice', required: true })
  @Prop()
  sessionAndroidPrice?: number;

  @ApiProperty({ description: 'sessionWebPrice', required: true })
  @Prop()
  sessionWebPrice?: number;

  @ApiProperty({ description: 'tutorialAppleId', required: true })
  @Prop()
  tutorialAppleId?: string;

  @ApiProperty({ description: 'tutorialApplePrice', required: true })
  @Prop()
  tutorialApplePrice?: number;

  @ApiProperty({ description: 'tutorialAndroidId', required: true })
  @Prop()
  tutorialAndroidId?: string;

  @ApiProperty({ description: 'tutorialAndroidPrice', required: true })
  @Prop()
  tutorialAndroidPrice?: number;

  @ApiProperty({ description: 'tutorialWebPrice', required: true })
  @Prop()
  tutorialWebPrice?: number;
}
export const PricingSchema = SchemaFactory.createForClass(Pricing);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Localized } from '../shared/localized';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export type OnBoardingDocument = OnBoarding & Document;
@Schema()
export class OnBoarding extends OBaseEntity {
  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  @ValidateNested()
  @Type(() => Localized)
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
export const OnBoardingSchema = SchemaFactory.createForClass(OnBoarding);

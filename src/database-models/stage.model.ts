import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export type StageDocument = Stage & Document;
@Schema()
export class Stage extends OBaseEntity {
  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  @ValidateNested()
  @Type(() => Localized)
  name: Localized;
  @ApiProperty()
  @Prop()
  @IsNumber()
  stageNumber: number;
}
export const StageSchema = SchemaFactory.createForClass(Stage);

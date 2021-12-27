import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Localized } from '../shared/localized';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
export type SubjectDocument = Subject & Document;
@Schema()
export class Subject extends OBaseEntity {
  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  @ValidateNested()
  @Type(() => Localized)
  name: Localized;

  @ApiProperty({ description: 'image', required: true })
  @IsString()
  @Prop()
  image?: string;
}
export const SubjectSchema = SchemaFactory.createForClass(Subject);

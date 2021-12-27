import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString } from 'class-validator';
import { User } from './user.model';
export type NoticeDocument = Notice & Document;
@Schema()
export class Notice extends OBaseEntity {
  @ApiProperty({ description: 'valueDate', required: true })
  @Prop()
  valueDate?: number;

  @ApiProperty({ type: () => User })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  @Allow()
  user?: User;

  @ApiProperty()
  @Prop()
  @IsString()
  @Allow()
  title: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @Allow()
  body: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  @Allow()
  entityType: string;

  @ApiProperty()
  @Prop()
  @IsString()
  @IsOptional()
  @Allow()
  entityId: string;
}
export const NoticeSchema = SchemaFactory.createForClass(Notice);

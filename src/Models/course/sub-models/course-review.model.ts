import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user.model';
export type CourseReviewDocument = CourseReview & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  skipVersioning: true,
})
export class CourseReview extends OBaseEntity {
  @ApiProperty({ type: () => User, description: 'comment', required: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: User;

  @ApiProperty({ description: 'comment', required: true })
  @Prop({ default: '' })
  comment?: string;

  @ApiProperty({ description: 'stars', required: true })
  @Prop({ default: 5 })
  stars?: number;
}
export const CourseReviewSchema = SchemaFactory.createForClass(CourseReview);

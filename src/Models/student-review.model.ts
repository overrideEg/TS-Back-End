import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course.model';
export type StudentReviewDocument = StudentReview & Document;
@Schema()
export class StudentReview extends OBaseEntity {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', autopopulate: true })
    course: Course;

    @Prop()
    valueDate?: number;

    @ApiProperty({ description: 'attendance', required: true })
    @Prop({ default: true })
    attendance: boolean;

    @ApiProperty({ description: 'grades', required: true })
    @Prop({ default: 0 })
    grades?: number;

    @ApiProperty({ description: 'performance', required: true })
    @Prop({ default: 0 })
    performance?: number;

    @ApiProperty({ description: 'understanding', required: true })
    @Prop({ default: 0 })
    understanding?: number;
}
export const StudentReviewSchema = SchemaFactory.createForClass(StudentReview);
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./course.model";
import * as mongoose from 'mongoose';

export class StudentReview {
    @ApiProperty({ type: () => Course, isArray: false, required: true })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', autopopulate: true })
    course: Course;


    @ApiProperty({description: 'valueDate', required: true })
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
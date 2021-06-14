import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from './grade.model';
import { Stage } from './stage.model';
import { Day } from '../shared/enums/day.enum';
import { Teacher } from './teacher.model';
import { OverrideUtils } from '../shared/override-utils';
import { Subject } from './subject.model';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from './user.model';
import { Student } from './student.model';

export enum LessonType {
    video = 'video',
    excercice = 'excercice'
}

export class CourseReview {
    @Prop({ required: true })
    OId: string
    @Prop()
    time: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    user?: User;
    @ApiProperty({ description: 'comment', required: true })
    @Prop({ default: '' })
    @IsString()
    comment?: string;
    @ApiProperty({ description: 'stars', required: true })
    @Prop({ default: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    stars?: number;
}
export class Attachement {
    @ApiProperty()
    @Prop()
    id: string;
    @ApiProperty()
    @IsString()
    @Prop()
    path: string;
    @ApiProperty()
    @Prop()
    @IsString()
    name: string;
    @ApiProperty()
    @Prop()
    @IsString()
    mimetype: string;
}
export class Lesson {
    
    @ApiProperty({ required: false })
    @Prop({ required: true })
    OId: string;

    @ApiProperty()
    @Prop()
    @IsString()
    name: string;

    @ApiProperty({ enum: [LessonType.excercice, LessonType.video] })
    @Prop({ enum: [LessonType.video, LessonType.excercice] })
    @IsEnum(LessonType)
    type: LessonType;

    @ApiProperty({ type: () => Attachement })
    @Prop({ required: false })
    @ValidateNested()
    @Type(() => Attachement)
    attachement: Attachement;

    @Prop({ default: false })
    isDone: boolean;
}

export class CourseContent {
    @ApiProperty({ required: false })
    @Prop({ required: true })
    OId: string
    @ApiProperty()
    @Prop()
    @IsString()
    chapter: string
    @ApiProperty({ type: () => Lesson, isArray: true })
    @Prop([Lesson])
    @ValidateNested()
    @Type(() => Lesson)
    lessons: Lesson[]
}
export type CourseDocument = Course & Document;
@Schema()
export class Course extends OBaseEntity {

  

    @ApiProperty()
    @Prop()
    createdAt?: number;

    @ApiProperty()
    @Prop()
    @IsString()
    cover?: string

    @ApiProperty()
    @Prop()
    @IsString()
    name?: string;
    @ApiProperty()
    @Prop()
    @IsNumber()
    price?: number;
    @ApiProperty()
    @Prop()
    @IsString()
    info?: string;
    @ApiProperty()
    @Prop()
    @IsNumber()
    startDate?: number;
    @ApiProperty()
    @Prop()
    @IsString()
    description?: string
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name, autopopulate: true })
    @IsNotEmpty()
    stage?: Stage;
    @ApiProperty({ type: () => Grade })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Grade.name, autopopulate: true })
    @IsNotEmpty()
    grade?: Grade;
    @ApiProperty({ type: () => Subject })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name, autopopulate: true })
    @IsNotEmpty()
    subject?: Subject;
    @ApiProperty({ enum: [Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday], isArray: true })
    @Prop({ enum: [Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday], type: [String] })
    @IsEnum(Day, { each: true })
    Days?: Day[]
    @ApiProperty()
    @Prop()
    @IsNumber()
    hour?: number;

    @ApiProperty({ type: () => CourseContent, isArray: true })
    @Prop([CourseContent])
    @ValidateNested()
    @Type(() => CourseContent)
    content?: CourseContent[];

    @ApiProperty({ type: () => CourseReview, isArray: true })
    @Prop([CourseReview])
    @ValidateNested()
    @Type(() => CourseReview)
    reviews?: CourseReview[];

    @ApiProperty({ type: () => Teacher })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name, autopopulate: true })
    teacher?: Teacher;

    @ApiProperty({ type: Number })
    @Prop({ default: 5 })
    cRating?: number
    @ApiProperty({ type: Number })
    @Prop({ default: 0 })
    progress?: number
    @ApiProperty({ type: Number })
    @Prop({ default: 0 })
    enrolled?: number;
    @ApiProperty()
    @Prop()
    inCart?: boolean;
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Course.name, autopopulate: true }])
    related?: Course[];
    
    @Prop([{ type: mongoose.Schema.Types.Mixed}])
    students: any[]
}
export const CourseSchema = SchemaFactory.createForClass(Course);
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
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum LessonType {
    video = 'video',
    excercice = 'excercice'
}
export class Attachement {
    @ApiProperty()
    @Prop()
    id : string;
    @ApiProperty()
    @IsString()
    @Prop()
    path: string;
    @ApiProperty()
    @Prop()
    @IsString()
    name : string;
    @ApiProperty()
    @Prop()
    @IsString()
    mimeType: string;
}
export class Lesson {
    @ApiProperty({ required: false })
    @Prop({required:true})
    OId: string
    @ApiProperty()
    @Prop()
    @IsString()
    name: string;
    @ApiProperty({ enum: [LessonType.excercice, LessonType.video] })
    @Prop({ enum: [LessonType.video, LessonType.excercice] })
    @IsEnum(LessonType)
    type: LessonType;
    @ApiProperty({type : ()=>Attachement})
    @Prop({ required: false })
    @IsString()
    @ValidateNested()
    @Type(()=>Attachement)
    attachement: Attachement;
}

export class CourseContent {
    @ApiProperty({ required: false })
    @Prop({required:true})
    OId: string
    @ApiProperty()
    @Prop()
    @IsString()
    chapter: string
    @ApiProperty({ type: () => Lesson, isArray: true })
    @Prop([Lesson])
    @ValidateNested()
    @Type(()=>Lesson)
    lessons: Lesson[]
}
export type CourseDocument = Course & Document;
@Schema()
export class Course extends OBaseEntity {
    @ApiProperty()
    @Prop()
    createdAt: number
    @ApiProperty()
    @Prop()
    @IsString()
    cover: string
    @ApiProperty()
    @Prop()
    @IsString()
    name: string;
    @ApiProperty()
    @Prop()
    @IsString()
    info: string;
    @ApiProperty()
    @Prop()
    @IsNumber()
    startDate: number;
    @ApiProperty()
    @Prop()
    @IsString()
    description: string
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name,autopopulate: true })
    @IsNotEmpty()
    stage?: Stage;
    @ApiProperty({ type: () => Grade })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Grade.name ,autopopulate: true})
    @IsNotEmpty()
    grade?: Grade;
    @ApiProperty({ type: () => Grade })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name ,autopopulate: true})
    @IsNotEmpty()
    subject?: Subject;
    @ApiProperty({ enum: [Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday] ,isArray:true})
    @Prop({enum:[Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday],type:[String]})
    @IsEnum(Day,{each:true})
    Days: Day[]
    @ApiProperty()
    @Prop()
    @IsNumber()
    hour: number;
    @ApiProperty({ type: () => CourseContent, isArray: true })
    @Prop([CourseContent])
    @ValidateNested()
    @Type(()=>CourseContent)
    content: CourseContent[];
    @ApiProperty({ type: () => Teacher })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name ,autopopulate: true})
    teacher?: Teacher;
    
    @ApiProperty({type: Number})
    cRating : number
    @ApiProperty({type: Number})
    progress:number
}
export const CourseSchema = SchemaFactory.createForClass(Course);
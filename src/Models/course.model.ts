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

export enum LessonType {
    video = 'video',
    excercice = 'excercice'
}
export class Lesson {
    @ApiProperty({ required: false })
    @Prop({required:true})
    OId: string
    @ApiProperty()
    @Prop()
    name: string;
    @ApiProperty({ enum: [LessonType.excercice, LessonType.video] })
    @Prop({ enum: [LessonType.video, LessonType.excercice] })
    type: LessonType;
    @ApiProperty()
    @Prop({ required: false })
    attachement: string;
}

export class CourseContent {
    @ApiProperty({ required: false })
    @Prop({required:true})
    OId: string
    @ApiProperty()
    @Prop()
    chapter: string
    @ApiProperty({ type: () => Lesson, isArray: true })
    @Prop([Lesson])
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
    cover: string
    @ApiProperty()
    @Prop()
    name: string;
    @ApiProperty()
    @Prop()
    info: string;
    @ApiProperty()
    @Prop()
    startDate: number;
    @ApiProperty()
    @Prop()
    description: string
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name })
    stage?: Stage;
    @ApiProperty({ type: () => Grade })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Grade.name })
    grade?: Grade;
    @ApiProperty({ enum: [Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday] ,isArray:true})
    @Prop({enum:[Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday],type:[String]})
    Days: Day[]
    @ApiProperty()
    @Prop()
    hour: number;
    @ApiProperty({ type: () => CourseContent, isArray: true })
    @Prop([CourseContent])
    content: CourseContent[];
    @ApiProperty({ type: () => Teacher })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name })
    teacher?: Teacher;
    
    @ApiProperty({type: Number})
    cRating : number
    @ApiProperty({type: Number})
    progress:number
}
export const CourseSchema = SchemaFactory.createForClass(Course);